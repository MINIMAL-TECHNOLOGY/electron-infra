import { BrowserWindow } from 'electron';
import { join } from 'path';

import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import { WindowContainerElement, WindowInitialState } from '@Common/types';
import { Databases, Screens } from '@Common/constants';
import { logger, RepositoryService } from './';

const ICON_PATH: string = join(__dirname, './../../00-common/icon.png');
const PRELOAD_FILE_PATH: string = join(__dirname, './../configurations/preload.js');
const DEFAULT_BROWSER_WINDOW_OPT = {
  icon: ICON_PATH,
  webPreferences: {
    preload: PRELOAD_FILE_PATH,
    nodeIntegration: true,
    contextIsolation: false,
  },
};
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.PORT}`
    : `file://${join(__dirname, '../../10-renderer/index.html')}`;
// const ACCENT = process.env.NODE_ENV === 'development' ? '/#/' : '#';
const ACCENT = '#';

export class WindowService {
  private container: Record<string, WindowContainerElement> = {};

  constructor() {}

  getSavedState() {}

  create(opts: WindowInitialState): BrowserWindow {
    const { screen: screenName, urlPath, ...windowProps } = opts;

    const browserWindow = new BrowserWindow({
      ...windowProps,
      ...DEFAULT_BROWSER_WINDOW_OPT,
    });
    const windowId = windowProps.windowId || [Screens.PREFIX, screenName, `w${browserWindow.id}`].join('-');

    browserWindow.on('close', () => {
      this.container = omit(this.container, [windowId]);
      if (!this.isWelcomeScreen(windowId)) {
        return;
      }

      this.closeAll();
    });

    browserWindow.on('closed', () => {
      this.container = omit(this.container, [windowId]);
    });

    const uiUrl = [BASE_URL, ACCENT, urlPath].join('');
    browserWindow.loadURL(uiUrl);
    logger.info('[WindowService] Openning new window | Props: %j | Url: %s', opts, uiUrl);

    this.container[windowId] = {
      windowId,
      screen: `${Screens.PREFIX}-${screenName}`,
      browserWindow,
    };

    return browserWindow;
  }

  isWelcomeScreen(windowId: string) {
    const welcomeScreenPrefix = [Screens.PREFIX, Screens.WELCOME.name].join('-');
    if (!windowId.startsWith(welcomeScreenPrefix)) {
      return false;
    }

    return true;
  }

  close(opts: { id?: number; browserWindow?: BrowserWindow }): void {
    const { id, browserWindow } = opts;
    if (isEmpty(id) && isEmpty(browserWindow)) {
      return;
    }

    browserWindow?.close();
    if (id) {
      BrowserWindow.fromId(id)?.close();
    }
  }

  closeAll() {
    for (const windowId in this.container) {
      if (this.isWelcomeScreen(windowId)) {
        continue;
      }

      const { browserWindow } = this.container[windowId];
      if (!browserWindow?.isClosable()) {
        continue;
      }
      browserWindow?.close();
    }
  }

  getContainer() {
    return this.container;
  }

  getWindow(id: number): WindowContainerElement {
    return this.container?.[id];
  }

  getWindows(windowName: string): WindowContainerElement[] {
    const windowPrefix = [Screens.PREFIX, windowName].join('-');
    const rs = pickBy(this.container, (element) => {
      return element?.screen?.startsWith(windowPrefix);
    });
    return Object.values(rs);
  }

  redirect(
    windowName: string,
    urlPath: string,
    sizeOpts: { width?: number; height?: number; x?: number; y?: number },
  ): void {
    const uiUrl = [BASE_URL, ACCENT, urlPath].join('');

    const { width, height, x, y } = sizeOpts;
    const windows = this.getWindows(windowName);
    for (const w of windows) {
      w.browserWindow.loadURL(uiUrl);

      if (width !== undefined && height !== undefined) {
        w.browserWindow.setSize(width, height, true);
      }

      if (x !== undefined && y !== undefined) {
        w.browserWindow.setPosition(x, y, true);
      }
    }
  }

  async saveWorkspace() {
    const repositoryService = RepositoryService.getInstance();
    await repositoryService.upsertWithWhere({
      table: Databases.TABLE_SETTING,
      condition: {
        code: Databases.TABLE_SETTING_KEYS.APPLICATION_WORKSPACE,
      },
      value: {
        code: Databases.TABLE_SETTING_KEYS.APPLICATION_WORKSPACE,
        dataType: 'JSON',
        value: JSON.stringify({}),
      },
    });

    const payload = {};
    for (const windowId in this.container) {
      if (this.isWelcomeScreen(windowId)) {
        continue;
      }

      const { browserWindow } = this.container[windowId];
      const windowBounds = browserWindow.getNormalBounds();
      const windowName = windowId.split('-')?.[1];
      payload[windowId] = {
        ...windowBounds,
        screen: windowName,
        title: browserWindow.getTitle(),
      };
    }

    await repositoryService.upsertWithWhere({
      table: Databases.TABLE_SETTING,
      condition: {
        code: Databases.TABLE_SETTING_KEYS.APPLICATION_WORKSPACE,
      },
      value: {
        code: Databases.TABLE_SETTING_KEYS.APPLICATION_WORKSPACE,
        dataType: 'JSON',
        value: JSON.stringify(payload),
      },
    });
  }

  async restoreWorkspace() {
    const repositoryService = RepositoryService.getInstance();
    const workspaceRs = await repositoryService.findOne({
      table: Databases.TABLE_SETTING,
      fields: ['code', 'value'],
      condition: {
        code: Databases.TABLE_SETTING_KEYS.APPLICATION_WORKSPACE,
      },
    });
    const workspace = JSON.parse(workspaceRs.value || '{}');
    for (const windowId in workspace) {
      if (this.container[windowId]) {
        continue;
      }

      const windowName = windowId.split('-')?.[1];
      if (!windowName) {
        continue;
      }

      this.create({
        windowId,
        screen: windowName,
        urlPath: windowName,
        ...workspace[windowId],
      });
    }
  }
}

export const windowService = new WindowService();
