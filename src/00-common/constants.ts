export * from './screen-definitions';

export class Constants {
  static readonly APPLICATION_NAME = 'QT-KTS';
  static readonly APPLICATION_FOLDER = 'app_data';
  static readonly APPLICATION_TIMEZONE = 'Asia/Seoul';
  static readonly ENCODE_UTF8 = 'utf8';
  static readonly MAX_NOTIFICATION = 3;
  static readonly QTS_AUTH_CREDENTIALS = {
    loginId: 'qt.kts',
    password: 'Quan.Tech.199',
  };
  static readonly MAX_DATA_LENGTH = 10000;
}

export class LocalStorageKeys {
  static readonly QTS_USER = '@qt/user';
  static readonly QTS_ALGO_1_WATCHED_SECTORS = '@qt/algo_1/watchedSectors';
}

export class DIContainerKeys {
  // SERVICEs
  static readonly SERVICE_KIS_MARKET_DATA = '@service/kis-market-data';
  static readonly SERVICE_QTS_MARKET_DATA = '@service/qts-market-data';

  // APPLICATION VARIABLEs
  static readonly VARIABLE_YT_ACCOUNTS = '@variable/yt-accounts';
}

export class Formatters {
  static readonly DATE = 'YYYY-MM-DD';
  static readonly TIME = 'HH:mm';
  static readonly DATE_TIME = 'YYYY-MM-DD HH:mm';
}

export class Sorts {
  static readonly DESC = 'desc';
  static readonly ASC = 'asc';
}

export class Urls {
  static readonly DEVELOPMENT: Record<string, string | object> = {
    REST_API_ENDPOINT: 'https://openapivts.koreainvestment.com:29443',
    WEB_SOCKET_ENDPOINT: 'ws://ops.koreainvestment.com:31000',
    QTS_API_ENDPOINT: 'https://qt-qts-be.quantech.vn',
    // QTS_API_ENDPOINT: 'http://localhost:1197',
    QTS_SOCKET_ENDPOINT: 'https://stream-qts.quantech.vn',
    // QTS_SOCKET_ENDPOINT: 'http://localhost:1197',
    QTS_ORDER_WORKER: { host: '10.0.116.48', port: 1191 },
    // QTS_ORDER_WORKER: { host: '0.0.0.1', port: 1191 },
  };

  static readonly PRODUCTION: Record<string, string | object> = {
    REST_API_ENDPOINT: 'https://openapi.koreainvestment.com:9443',
    WEB_SOCKET_ENDPOINT: 'ws://ops.koreainvestment.com:21000',
    QTS_SOCKET_ENDPOINT: 'https://stream-qts.quantech.vn',
    QTS_API_ENDPOINT: 'https://qt-qts-be.quantech.vn',
    // QTS_ORDER_WORKER: { host: '0.0.0.0', port: 1191 },
    QTS_ORDER_WORKER: { host: '10.0.116.48', port: 1191 },
  };
}

export class Databases {
  static readonly SCOPE_INTERNAL = 'internal';
  static readonly SCOPE_FUNDAMENTAL = 'fundamental';
  static readonly SCOPE_DERIVATIVE = 'derivative';

  static readonly TABLE_SETTING = 'setting';
  static readonly TABLE_ACCOUNT = 'account';
  static readonly TABLE_PORTFOLIO = 'portfolio';
  static readonly TABLE_FUNDAMENTAL_ORDER = 'fundamental_order';
  static readonly TABLE_FUNDAMENTAL_STOCK = 'fundamental_stock';
  static readonly TABLE_DERIVATIVE_ORDER = 'derivative_order';
  static readonly TABLE_DERIVATIVE_STOCK = 'derivative_stock';

  static readonly FILE_MAP = {
    [Databases.TABLE_SETTING]: Databases.SCOPE_INTERNAL,
    [Databases.TABLE_ACCOUNT]: Databases.SCOPE_INTERNAL,
    [Databases.TABLE_PORTFOLIO]: Databases.SCOPE_DERIVATIVE,
    [Databases.TABLE_DERIVATIVE_ORDER]: Databases.SCOPE_DERIVATIVE,
    [Databases.TABLE_DERIVATIVE_STOCK]: Databases.SCOPE_DERIVATIVE,
    [Databases.TABLE_FUNDAMENTAL_ORDER]: Databases.SCOPE_FUNDAMENTAL,
    [Databases.TABLE_FUNDAMENTAL_STOCK]: Databases.SCOPE_FUNDAMENTAL,
  };

  static readonly TABLE_SETTING_KEYS = {
    APPLICATION_WORKSPACE: 'APPLICATION_WORKSPACE',
  };
}

export class StockExchanges {
  static readonly KOSPI = 'KOSPI';
  static readonly KOSDAQ = 'KOSDAQ';
}

export class TradeAccountTypes {
  static readonly FUNDAMENTAL = '01';
  static readonly DERIVATIVE = '03';
}

export class OrderActions {
  static readonly LONG = 'LONG';
  static readonly SHORT = 'SHORT';
}

export class OrderStatuses {
  static readonly SENDING = 'SENDING';
  static readonly PENDING = 'PENDING';
  static readonly COMPLETED = 'COMPLETED';
  static readonly CANCELED = 'CANCELED';
  static readonly FAILED = 'FAILED';
  static readonly UNKNOWN = 'UNKNOWN';
}

export class OrderTypes {
  static readonly LIMIT = 'LO';
  static readonly MARKET_PRICE = 'MP';
  static readonly MATCH_AND_CANCEL = 'MAK';
  static readonly MATCH_OR_CANCEL = 'MOK';

  static readonly ARRAY_VALUE = [
    { id: this.LIMIT, name: 'Limit Price' },
    { id: this.MARKET_PRICE, name: 'Market Price' },
    { id: this.MATCH_AND_CANCEL, name: 'Match And Cancel' },
    { id: this.MATCH_OR_CANCEL, name: 'Match Or Cancel' },
  ];

  static readonly FUNDAMENTAL: Record<string, string> = {
    LO: '00',
    MP: '01',
    MAK: '11',
    MOK: '12',
  };

  static readonly DERIVATIVE: Record<string, string> = {
    LO: '01',
    MP: '02',
    MAK: '10',
    MOK: '11',
  };
}

export class OrderMechanicals {
  static readonly MANUAL = 'MANUAL';
  static readonly AL1 = 'AL1';
  static readonly AL2 = 'AL2';
}

export class MachineActions {
  static readonly NEW = 'NEW';
  static readonly CLEAR = 'CLEAR';
  static readonly TAKE_PROFIT = 'TP';
  static readonly CUT_LOSS = 'CL';
}

export class StockTypes {
  static readonly DERIVATIVE = 'D';
  static readonly FUNDAMENTAL = 'F';
}

export class TradeTypes {
  static readonly DERIVATIVE = 'DERIVATIVE';
  static readonly FUNDAMENTAL = 'FUNDAMENTAL';
  static readonly BOTH = 'BOTH';
}

export class QueueProcessStatuses {
  static readonly NEW = 'NEW';
  static readonly PROCESSING = 'PROCESSING';
  static readonly DONE = 'DONE';
  static readonly FAIL = 'FAIL';
}

export class ResultCode {
  static readonly SUCCESS = 'SUCCESS';
  static readonly FAIL = 'FAIL';
  static readonly SERVER_ERROR = 'SERVER_ERROR';
}

export class Side {
  static readonly BUY = 'B';
  static readonly SELL = 'S';
  static readonly LONG = 'B';
  static readonly SHORT = 'S';
  static readonly BID = 'B';
  static readonly ASK = 'S';
  static readonly ALL = 'A';
  static readonly UP = 'U';
  static readonly DOWN = 'D';
}

export class PriceStep {
  static readonly FUNDAMENTAL = {
    KR_1: {
      maxPrice: 5000,
      step: 5,
    },
    KR_2: {
      maxPrice: 10000,
      step: 10,
    },
    KR_3: {
      maxPrice: 50000,
      step: 50,
    },
    KR_4: {
      maxPrice: 100000,
      step: 100,
    },
    KR_5: {
      maxPrice: 500000,
      step: 500,
    },
    KR_6: {
      maxPrice: -1,
      step: 1000,
    },
  };

  static readonly DERIVATIVE = {
    OPTION: 0.1,
  };
}

export class ThirdPartyServiceProviders {
  static readonly KIS = 'KIS';
  static readonly MAS = 'MAS';
  static readonly QTS = 'QTS';
}

export class KISRequestEvents {
  static readonly DEVELOPMENT: Record<string, string> = {
    // Market Data
    STOCK_PRICE: 'H0STCNT0',
    STOCK_QUOTE: 'H0STASP0',
    EXECUTION_NOTIFICATION: 'H0STCNI9',

    // Rest API
    INQUIRY_PRICE: 'FHKST01010100',
    INQUIRY_QUOTE: 'FHKST01010200',
    INQUIRY_INDAY_STOCK_HISTORICAL_DATA: 'FHKST01010300',
    INQUIRY_STOCK_BALANCE: 'VTTC8434R',
    MAKE_ORDER_BUY: 'VTTC0802U',
    MAKE_ORDER_SELL: 'VTTC0801U',
    CORRECTION_ORDER: 'VTTC0803U',
    INQUIRY_ORDER_HISTORY_LATEST_3M: 'VTTC8001R',
    INQUIRY_ORDER_HISTORY_PREV_3M: 'VTSC9115R',
  };

  static readonly PRODUCTION: Record<string, string> = {
    // Market Data
    STOCK_PRICE: 'H0STCNT0',
    STOCK_QUOTE: 'H0STASP0',
    EXECUTION_NOTIFICATION: 'H0STCNI0',

    // Rest API
    INQUIRY_PRICE: 'FHKST01010100',
    INQUIRY_QUOTE: 'FHKST01010200',
    INQUIRY_INDAY_STOCK_HISTORICAL_DATA: 'FHKST01010300',
    INQUIRY_STOCK_BALANCE: 'TTTC8434R',
    MAKE_ORDER_BUY: 'TTTC0802U',
    MAKE_ORDER_SELL: 'TTTC0801U',
    CORRECTION_ORDER: 'TTTC0803U',
    INQUIRY_ORDER_HISTORY_LATEST_3M: 'TTTC8001R',
    INQUIRY_ORDER_HISTORY_PREV_3M: 'CTSC9115R',
  };
}

export class QTSSocketOptions {
  static readonly AUTH = {
    authenticationType: 'credentials',
    credentials: { username: 'qt.kts', password: 'Quan.Tech.199' },
  };

  static readonly OPTIONS = {
    path: '/v1/api/Stream/market',
    extraHeaders: {
      origin: 'qT_kts_application',
      compress: 'disable',
    },
    auth: { identifier: 'qt.kts' },
    query: { compress: 'disable' },
    reconnect: true,
    forceNew: true,
  };

  static readonly MARKET_DATA_ROOM = '@QT/kr/MarketData';
  static readonly MARKET_DATA_EVENT = '@QT/kr/MarketData/KR_PSD';
  static readonly KR_SHEET_FW_EVENT = '@QT/kr/MarketData/KR_SHEET_PSD';
  static readonly JOIN_ROOM_REQUEST = 'join-request';
  static readonly LEAVE_ROOM_REQUEST = 'leave-request';
  static readonly KR_REQUEST_BROADCAST = 'kr-request-broadcast';
}

export class OrderClassifications {
  static readonly EXECUTE_ORDER = 'EXECUTE';
  static readonly CANCEL_ORDER = 'CANCEL';
  static readonly MODIFY_ORDER = 'MODIFY';
}

export class YTActionTypes {
  static readonly LOGIN = 'LOGIN';
  static readonly PING = 'PING';
  static readonly REQUEST_ERROR = 'REQUEST_ERROR';
  static readonly REQUEST_DATA = 'REQUEST_DATA';
  static readonly SYSTEM_MESSAGE = 'SYSTEM_MESSAGE';
  static readonly REALTIME_DATA = 'REALTIME_DATA';

  static readonly GET_ACCOUNT_INFORMATION = 'GET_ACCOUNT_INFORMATION';
  static readonly ACCOUNT_INFORMATION = 'ACCOUNT_INFORMATION';

  static readonly GET_ACCOUNT_PORTFOLIO = 'GET_ACCOUNT_PORTFOLIO';
  static readonly ACCOUNT_PORTFOLIO = 'ACCOUNT_PORTFOLIO';
  static readonly ACCOUNT_BALANCE = 'ACCOUNT_BALANCE';

  static readonly GET_EQUITY_ACCOUNT_PORTFOLIO = 'GET_EQUITY_ACCOUNT_PORTFOLIO';
  static readonly EQUITY_ACCOUNT_PORTFOLIO = 'EQUITY_ACCOUNT_PORTFOLIO';

  static readonly GET_STOCK_PRICE = 'GET_STOCK_PRICE';
  static readonly STOCK_PRICE = 'STOCK_PRICE';

  static readonly GET_FUTURE_PRICE = 'GET_FUTURE_PRICE';
  static readonly FUTURE_PRICE = 'FUTURE_PRICE';

  static readonly GET_ASYNC_STOCK_PRICE = 'GET_ASYNC_STOCK_PRICE';

  static readonly GET_NET_FOREIGN_QUANTITY = 'GET_NET_FOREIGN_QUANTITY';
  static readonly NET_FOREIGN_QUANTITY = 'NET_FOREIGN_QUANTITY';

  static readonly EXECUTE_STOCK_ORDER = 'EXECUTE_STOCK_ORDER';
  static readonly CANCEL_STOCK_ORDER = 'CANCEL_STOCK_ORDER';
  static readonly MODIFY_STOCK_ORDER = 'MODIFY_STOCK_ORDER';

  static readonly EXECUTE_FUTURE_ORDER = 'EXECUTE_FUTURE_ORDER';
  static readonly CANCEL_FUTURE_ORDER = 'CANCEL_FUTURE_ORDER';
  static readonly MODIFY_FUTURE_ORDER = 'MODIFY_FUTURE_ORDER';
}
