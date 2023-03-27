import { spawn } from 'redux-saga/effects';

import common from './common.saga';
import route from './route.saga';

export default function* saga() {
  yield spawn(common);
  yield spawn(route);
}
