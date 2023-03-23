import { Menu, MenuItem, dialog } from 'electron';

import { Constants, Screens } from '@Common/constants';
import { SagaService, windowService } from '@Main/services';
import { ScreenDefinition } from '@Common/types';
import { RouteActions } from '@Main/redux/action';

const generateMenu = (opts: { open: Function }) => {
  const { open } = opts;
  return [
    new MenuItem({
      label: Constants.APPLICATION_NAME,
      submenu: [
        {
          label: 'View',
          submenu: [
            { type: 'separator' },
            { role: 'resetZoom' },
            {
              role: 'zoomIn',
              accelerator: 'CommandOrControl+=',
              visible: true,
              enabled: true,
            },
            {
              role: 'zoomOut',
              accelerator: 'CommandOrControl+-',
              visible: true,
              enabled: true,
            },
            { type: 'separator' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            {
              label: 'Restore windows',
              accelerator: 'CommandOrControl+Alt+r',
              click: () => {
                console.log('Restore windows');
              },
            },
            {
              label: 'Toggle window On-Top',
              accelerator: 'CommandOrControl+Alt+t',
              click: () => {
                console.log('Toggle window On-Top');
              },
            },
          ],
        },
        {
          label: 'Workspaces',
          submenu: [
            {
              label: 'Save',
              click: async () => {
                await windowService.saveWorkspace();
                await dialog.showMessageBox({ message: 'Successfully saved workspace(s)!' });
              },
            },
            {
              label: 'Restore',
              click: async () => {
                await windowService.restoreWorkspace();
              },
              /* submenu: [].map((workspace) => {
                return {
                  label: workspace,
                  click() {
                    console.log(`Load workspace: ${workspace}`);
                  },
                };
              }), */
            },
          ],
        },
        {
          label: 'Settings',
          click: () => {
            console.log('Open settings');
          },
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }),
    new MenuItem({
      label: 'Screens',
      submenu: [
        {
          label: 'Trade',
          submenu: [
            {
              label: 'Click Order',
              click: () => {
                open(Screens.CLICK_ORDER);
              },
            },
            { type: 'separator' },
            {
              label: 'Derivative Trade History',
              click: () => {
                open(Screens.DERIVATIVE_TRADE_HISTORY);
              },
            },
            {
              label: 'Derivative Portfolio',
              click: () => {
                open(Screens.DERIVATIVE_PORTFOLIO);
              },
            },
            {
              label: 'Fundamental Trade History',
              click: () => {
                open(Screens.FUNDAMENTAL_TRADE__HISTORY);
              },
            },
            {
              label: 'Fundamental Portfolio',
              click: () => {
                open(Screens.FUNDAMENTAL_PORTFOLIO);
              },
            },
          ],
        },
        { type: 'separator' },
        {
          label: 'Info',
          submenu: [
            {
              label: 'Tick Chart',
            },
            {
              label: 'Combine Chart',
            },
          ],
        },
      ],
    }),
    new MenuItem({
      label: 'Strategies',
      submenu: [
        {
          label: 'ALGO_1',
          submenu: [
            {
              label: 'Details/Combine chart',
              click: () => {
                open(Screens.ALGORITHM_1);
              },
            },
            {
              label: 'Sectors Chart',
              click: () => {
                open(Screens.ALGORITHM_1_SECTOR_CHARTS);
              },
            },
          ],
        },
        {
          label: 'Algorithm KOSPI USD',
          click: () => {
            open(Screens.ALGORITHM_KOSPI_USD);
          },
        },
        {
          label: 'Algorithm Stock Watch',
          click: () => {
            open(Screens.ALGORITHM_STOCK_WATCH);
          },
        },
      ],
    }),
  ];
};

export class MenuService {
  private static instance: MenuService;

  constructor() {}

  static getInstance(): MenuService {
    if (!this.instance) {
      this.instance = new MenuService();
    }

    return this.instance;
  }

  open(screenDefinition: ScreenDefinition) {
    const sagaService = SagaService.getInstance();
    sagaService.dispatch({
      type: RouteActions.ROUTE_NEW_SCREEN,
      payload: { screenDefinition },
    });
  }

  setup() {
    const menu = generateMenu({ open: this.open });
    const applicationMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(applicationMenu);
  }
}
