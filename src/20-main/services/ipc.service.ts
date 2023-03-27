import { IpcEventOptions, IpcObserveOptions } from '@Common/types';
import { IpcMain, ipcMain as ElectroIpcMain } from 'electron';
import { windowService } from '@Main/services';

export class MainEventService {
  private static instance: MainEventService;

  constructor(private ipcMain: IpcMain) {}

  static getInstance(): MainEventService {
    if (!this.instance) {
      this.instance = new MainEventService(ElectroIpcMain);
    }

    return this.instance;
  }

  consume<T>(opts: IpcEventOptions<T>) {
    const { topic, handler } = opts;
    this.ipcMain.on(topic, handler);
  }

  async handle<T>(opts: IpcEventOptions<T>): Promise<void> {
    const { topic, handler } = opts;
    this.ipcMain.handle(topic, async (event, payload) => {
      try {
        const rs = await handler(event, payload);
        return rs;
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          payload: error,
        };
      }
    });
  }

  publish<T>(windowName: string, opts: IpcObserveOptions<T>) {
    const observeWindows = windowService.getWindows(windowName);
    // console.log(windowService.getContainer(), windowName, observeWindows);
    for (const observeWindow of observeWindows) {
      const browserWindow = observeWindow?.browserWindow;

      if (browserWindow?.isDestroyed()) {
        continue;
      }

      const { topic, payload } = opts;
      browserWindow.webContents.send(topic, payload);
    }
  }
}
