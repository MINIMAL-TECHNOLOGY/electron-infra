import { WindowInitialState } from '@Common/types';
import { windowService } from '@Main/services';
import { BrowserWindow } from 'electron';

export class BaseScreen {
  protected browserWindow: BrowserWindow;
  protected initialState: WindowInitialState;

  constructor(initialState: WindowInitialState) {
    this.initialState = initialState;
    this.browserWindow = windowService.create(initialState);
    this.binding();
  }

  binding() {
    this.browserWindow.on('ready-to-show', () => {
      this.browserWindow.show();
    });
  }
}
