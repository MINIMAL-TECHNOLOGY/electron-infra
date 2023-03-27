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
