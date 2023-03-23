import { fork, takeEvery, call, put } from 'redux-saga/effects';

import { ApplicationActions, RouteActions } from '@Main/redux/action';
import { logger } from '@Main/services';
import { Screens } from '@Common/constants';

function* applicationStart() {
  yield takeEvery(ApplicationActions.APPLICATION_START, function* run() {
    yield call(logger.info, 'APPLICATION STARTED');

    yield put({
      type: RouteActions.ROUTE_NEW_SCREEN,
      payload: {
        screenDefinition: Screens.WELCOME,
      },
    });
  });
}

function* applicationCleanUp() {
  yield takeEvery(ApplicationActions.APPLICATION_CLEAN_UP, function* run() {
    yield call(logger.info, 'APPLICATION CLEAN UP');
  });
}

export default function* saga() {
  yield fork(applicationStart);
  yield fork(applicationCleanUp);
}
