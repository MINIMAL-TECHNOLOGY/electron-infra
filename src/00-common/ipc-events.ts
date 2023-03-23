export class CommonIpcEvents {
  static readonly EVENT_TEST = '@common/event-test';
}

export class RouterIpcEvents {
  static readonly GO_TO = '@router/goto';
}

export class AuthIpcEvents {
  static readonly LOGIN = '@auth/login';
  static readonly LOGIN_RESPONSE = '@auth/login-response';
  static readonly LOAD_SAVED_ACCOUNTS = '@auth/load-saved-accounts';
  static readonly DELETE_SAVED_ACCOUNT = '@auth/delete-saved-account';
}

export class StockIpcEvents {
  static readonly INQUIRY_PRICE = '@stock/inquiry-price';
  static readonly INQUIRY_INDAY_HISTORICAL_DATA = '@stock/inquiry-inday-historical-data';
  static readonly OBSERVE_MARKET_DATA = '@stock/observe-market-data';
  static readonly OBSERVE_QTS_MARKET_DATA = '@stock/observe-qts-market-data';
  static readonly OBSERVE_ORDER_EXECUTION_INQUIRY = '@stock/observe-order-execution-inquiry';
  static readonly GET_TRADE_ACCOUNTS = '@stock/get-trade-accounts';
  static readonly GET_ACCOUNT_PORTFOLIO = '@stock/get-account-portfolio';
  static readonly GET_EQUITY_ACCOUNT_PORTFOLIO = '@stock/get-equity-account-portfolio';
  static readonly EXECUTE_STOCK_ORDER = '@stock/execute-stock-order';
  static readonly CANCEL_STOCK_ORDER = '@stock/cancel-stock-order';
  static readonly MODIFY_STOCK_ORDER = '@stock/modify-stock-order';
  static readonly EXECUTE_FUTURE_ORDER = '@stock/execute-future-order';
  static readonly GET_TRADE_HISTORY = '@stock/get-trade-history';
  static readonly LOAD_PENDING_ORDERS = '@stock/load-pending-orders';
  static readonly OBSERVE_ACCOUNT_PORTFOLIO = '@stock/observe-account-portfolio';
  static readonly OBSERVE_EQUITY_ACCOUNT_PORTFOLIO = '@stock/observe-equity-account-portfolio';
  static readonly OBSERVE_ACCOUNT_BALANCE = '@stock/observe-account-balance';
  static readonly GET_NET_FOREIGN_QUANTITY = '@stock/get-net-foreign-quantity';
  static readonly GET_STOCK_PRICES = '@stock/get-stock-prices';
}

export class AlgorithmIpcEvents {
  static readonly ORDER_REQUEST_BROADCAST = '@algorithm/order-request-broadcast';
  static readonly ALGO_1_OBSERVE_SECTOR_DATA = '@algorithm/ALGO_1/observe_sector_data';
  static readonly ALGO_1_OBSERVE_STOCK_DATA = '@algorithm/ALGO_1/observe_stock_data';
  static readonly ALGO_KOSPI_USD_OBSERVE_STOCK_PRICE = '@algorithm/ALGO_KOSPI_USD/observe_stock_price';
  static readonly ALGO_KOSPI_USD_OBSERVE_NET_FOREIGN_QUANTITY =
    '@algorithm/ALGO_KOSPI_USD/observe_net_foreign_quantity';
  static readonly ALGO_STOCK_WATCH_OBSERVE_STOCK_PRICE = '@algorithm/ALGO_STOCK_WATCH/observe_stock_price';
}
