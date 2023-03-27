import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import common from './common.slice';
import auth from './auth.slice';

const rootReducer = {
  common,
  auth,
};

const sagaMiddleware = createSagaMiddleware();
export const applicationStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof applicationStore.getState>;

export type ApplicationDispatch = typeof applicationStore.dispatch;
