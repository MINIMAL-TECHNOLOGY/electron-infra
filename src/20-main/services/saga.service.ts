import { Store } from 'redux';
import rootSaga from '@Main/redux/sagas';
import { store as mainStore, sagaMiddleware } from '@Main/configurations';
import { logger } from '@Main/services';

export class SagaService {
  private static instance: SagaService;

  constructor(private store: Store) {
    sagaMiddleware.run(rootSaga);
    logger.info('[SagaService] Main-Process Saga is running...!');
  }

  static getInstance(): SagaService {
    if (!this.instance) {
      this.instance = new SagaService(mainStore);
    }

    return this.instance;
  }

  dispatch<T>(opts: { type: string; payload?: T }): void {
    if (!this.store) {
      console.error('Main-Process store is not created!');
    }

    this.store.dispatch(opts);
  }
}
