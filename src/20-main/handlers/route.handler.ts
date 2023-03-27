import { RouterIpcEvents } from '@Common/ipc-events';
import { ScreenDefinition } from '@Common/types';
import { windowService } from '@Main/services';

import { BaseHandler } from './base.handler';

class RouteHandler extends BaseHandler {
  constructor() {
    super({ name: RouteHandler.name });
  }

  handle() {
    this.eventHandler.handle<{
      fromScreen: ScreenDefinition;
      toScreen: ScreenDefinition;
    }>({
      topic: RouterIpcEvents.GO_TO,
      handler: (_event, payload) => {
        const { fromScreen, toScreen } = payload;
        windowService.redirect(fromScreen.name, toScreen?.urlPath || toScreen.name, toScreen.sizes);
      },
    });
  }
}

export const routeHandler = new RouteHandler();
