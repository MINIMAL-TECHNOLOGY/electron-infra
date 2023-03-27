import { App as ElectronApplication } from 'electron';

import { ApplicationActions } from '@Main/redux/action';
import {
  RepositoryService,
  SagaService,
  logger,
  // runExecutionWorker,
} from '@Main/services';
import * as applicationHandlers from '@Main/handlers';

const ENV = (process.env.REACT_APP_ENV || 'development').toUpperCase();

// -----------------------------------------------------------
interface IApplication {
  start(): void;
  configure(): Promise<void>;
  stop(): void;
}

// -----------------------------------------------------------
abstract class BaseApplication implements IApplication {
  constructor(protected app: ElectronApplication) {}

  abstract start(): void;
  abstract configure(): Promise<void>;
  abstract stop(): void;
}

// -----------------------------------------------------------
export class Application extends BaseApplication {
  private repositoryService: RepositoryService;
  private sagaService: SagaService;

  // -----------------------------------------------------------
  constructor(app: ElectronApplication) {
    super(app);

    this.repositoryService = RepositoryService.getInstance();
    this.sagaService = SagaService.getInstance();
  }

  // -----------------------------------------------------------
  async configure() {
    this.configureDeveloperTools();

    logger.info('[Application][configure] Configuring application database');
    await this.repositoryService.migrateDatabase();

    // Init saga service
    await this.configureServices();

    // Init application handler
    await this.configureHandlers();

    // Init application menu
    logger.info('[Application][configure] Configuring application menu');
  }

  // -----------------------------------------------------------
  async configureDeveloperTools() {
    switch (ENV) {
      case 'DEVELOPMENT': {
        (await import('@Main/configurations/developer-tools.configuration'))?.default();
        break;
      }
      default: {
        break;
      }
    }
  }

  // -----------------------------------------------------------
  async configureHandlers() {
    logger.info('[Application][configure] Configuring application handler');
    const handlerKeys = Object.keys(applicationHandlers);

    for (const key of handlerKeys) {
      const handler = applicationHandlers[key];
      handler.handle();
    }
  }

  // -----------------------------------------------------------
  async configureServices() {
    logger.info('[Application][configure] Configuring application market data service');
  }

  // -----------------------------------------------------------
  start() {
    logger.info('[Application][start] Starting KIS Application');
    this.sagaService?.dispatch({ type: ApplicationActions.APPLICATION_START });
    this.postStart();
  }

  // -----------------------------------------------------------
  stop() {
    logger.info('[Application][stop] Stopping KIS Application');
  }

  // -----------------------------------------------------------
  postStart() {
    logger.info('[Application][start] Starting KIS Application');
    this.sagaService?.dispatch({ type: ApplicationActions.APPLICATION_CLEAN_UP });
  }
}
