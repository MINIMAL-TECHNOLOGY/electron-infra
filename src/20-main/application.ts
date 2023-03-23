import { App as ElectronApplication } from 'electron';

import {
  Databases,
  // QTSSocketOptions,
  // ThirdPartyServiceProviders,
  // TradeTypes,
  // Urls,
  // DIContainerKeys,
} from '@Common/constants';
import { ApplicationActions } from '@Main/redux/action';
import {
  RepositoryService,
  SagaService,
  MenuService,
  UserService,
  // kisMarketDataService,
  // QTSMarketDataService,
  // onReceiveMarketData,
  logger,
  // runExecutionWorker,
} from '@Main/services';
// import { DIContainer } from '@Main/configurations';
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
  private userService: UserService;
  // private diContainer: DIContainer;

  // -----------------------------------------------------------
  constructor(app: ElectronApplication) {
    super(app);

    this.repositoryService = RepositoryService.getInstance();
    this.sagaService = SagaService.getInstance();
    this.userService = UserService.getInstance();
    // this.diContainer = DIContainer.getInstance();
  }

  // -----------------------------------------------------------
  async configure() {
    this.configureDeveloperTools();

    logger.info('[Application][configure] Configuring application database');
    await this.repositoryService.migrateDatabase();

    // Init saga service
    // await this.configureServices();

    // Init application handler
    await this.configureHandlers();

    // Init application menu
    logger.info('[Application][configure] Configuring application menu');
    const menuService = MenuService.getInstance();
    menuService.setup();
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
  // async configureServices() {
  //   logger.info('[Application][configure] Configuring application market data service');

  //   // KIS Market Data Service
  //   kisMarketDataService?.establish((payload: any) => {
  //     onReceiveMarketData({ provider: ThirdPartyServiceProviders.KIS, payload });
  //   });
  //   this.diContainer.bind(DIContainerKeys.SERVICE_KIS_MARKET_DATA, kisMarketDataService);

  //   // QTS Market Data Service
  //   const qtsMarketDataService = new QTSMarketDataService({
  //     host: Urls[ENV].QTS_SOCKET_ENDPOINT,
  //     options: QTSSocketOptions.OPTIONS,
  //     auth: QTSSocketOptions.AUTH,
  //     onAuthenticated: () => {
  //       qtsMarketDataService.emit({
  //         event: QTSSocketOptions.JOIN_ROOM_REQUEST,
  //         payload: {
  //           rooms: [QTSSocketOptions.MARKET_DATA_ROOM],
  //         },
  //       });
  //       logger.info('[Application][configure] Joined to %s room!', QTSSocketOptions.MARKET_DATA_ROOM);
  //     },
  //   });

  //   qtsMarketDataService.client.on(QTSSocketOptions.MARKET_DATA_EVENT, (payload: any) => {
  //     onReceiveMarketData({
  //       provider: ThirdPartyServiceProviders.QTS,
  //       payload,
  //       messageType: QTSSocketOptions.MARKET_DATA_EVENT,
  //     });
  //   });
  //   qtsMarketDataService.client.on(QTSSocketOptions.KR_SHEET_FW_EVENT, (payload: any) => {
  //     onReceiveMarketData({
  //       provider: ThirdPartyServiceProviders.QTS,
  //       payload,
  //       messageType: QTSSocketOptions.KR_SHEET_FW_EVENT,
  //     });
  //   });
  //   qtsMarketDataService.connect();
  //   this.diContainer.bind(DIContainerKeys.SERVICE_QTS_MARKET_DATA, qtsMarketDataService);

  //   // Order status worker
  //   // runExecutionWorker({ workerIdentifier: TradeTypes.FUNDAMENTAL });
  //   // runExecutionWorker({ workerIdentifier: TradeTypes.DERIVATIVE });
  // }

  // -----------------------------------------------------------
  start() {
    logger.info('[Application][start] Starting KIS Application');
    this.sagaService?.dispatch({ type: ApplicationActions.APPLICATION_START });
    this.postStart();
  }

  // -----------------------------------------------------------
  stop() {
    logger.info('[Application][stop] Stopping KIS Application');
    this.userService.deactivateAllAccounts();
  }

  // -----------------------------------------------------------
  postStart() {
    logger.info('[Application][start] Starting KIS Application');
    this.sagaService?.dispatch({ type: ApplicationActions.APPLICATION_CLEAN_UP });

    this.repositoryService.delete({ table: Databases.TABLE_FUNDAMENTAL_ORDER });
    this.repositoryService.delete({ table: Databases.TABLE_DERIVATIVE_ORDER });
  }
}
