import { fork, takeEvery, call } from 'redux-saga/effects';

import { RouteActions } from '@Main/redux/action';
import { logger, windowService, MainEventService } from '@Main/services';
import { ScreenDefinition } from '@Common/types';

interface MenuScreenOpenAction {
  type: string;
  payload: {
    screenDefinition: ScreenDefinition;
  };
}

function* newScreen() {
  yield takeEvery(RouteActions.ROUTE_NEW_SCREEN, function* run(action: MenuScreenOpenAction) {
    const { screenDefinition } = action.payload;
    yield call(logger.info, '[Route][newScreen] Open screen: %j', screenDefinition);

    const { name: screen, title, sizes, urlPath } = screenDefinition;
    windowService.create({
      ...sizes,
      screen,
      title,
      urlPath: urlPath || screen,
      center: true,
    });
  });
}

function* observeToWindow() {
  yield takeEvery(
    RouteActions.ROUTE_OBSERVE_TO_WINDOW,
    function* run(action: { type: string; payload: { windows: Array<string>; topic: string; payload: any } }) {
      const { windows, topic, payload } = action.payload;
      const eventService = MainEventService.getInstance();

      for (const windowName of windows) {
        yield eventService.publish(windowName, {
          topic,
          payload,
        });
      }
    },
  );
}

export default function* saga() {
  yield fork(newScreen);
  yield fork(observeToWindow);
}
