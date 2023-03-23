import { dialog } from 'electron';
import { CommonIpcEvents } from '@Common/ipc-events';
import { ResultCode } from '@Common/constants';

import { BaseHandler } from './base.handler';

class CommonHandler extends BaseHandler {
  constructor() {
    super({ name: CommonHandler.name });
  }

  handle() {
    this.eventHandler.handle<{ name: string }>({
      topic: CommonIpcEvents.EVENT_TEST,
      handler: (_event, payload) => {
        const { name } = payload;
        const message = `hello ${name}`;
        dialog.showMessageBox({ message });

        return {
          status: ResultCode.SUCCESS,
          payload: message,
        };
      },
    });
  }
}

export const commonHandler = new CommonHandler();
