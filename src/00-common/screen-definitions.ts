import { ScreenDefinition } from '@Common/types';

export class Screens {
  static readonly PREFIX = 'qt_kts';

  static readonly WELCOME: ScreenDefinition = {
    name: 'welcome',
    title: 'QT-KTS Welcome',
    sizes: { width: 1366, height: 768 },
  };

  static readonly AUTH: ScreenDefinition = {
    name: 'auth',
    title: 'QT-KTS Login',
    sizes: { width: 1366, height: 768 },
  };

  static readonly HOME: ScreenDefinition = {
    name: 'home',
    title: 'QT-KTS Home',
    sizes: { width: 400, height: 600, x: 0, y: 0 },
  };

  static readonly SETTING: ScreenDefinition = {
    name: 'setting',
    title: 'Settings',
    sizes: { width: 1080, height: 800 },
  };

  static readonly FUNDAMENTAL_SINGLE_ORDER: ScreenDefinition = {
    name: 'fundatamental_single_order',
    title: 'Fundamental Single Order',
    sizes: { width: 1080, height: 800 },
  };

  static readonly FUNDAMENTAL_TRADE__HISTORY: ScreenDefinition = {
    name: 'fundatamental_trade_history',
    title: 'Fundamental Trade History',
    sizes: { width: 1080, height: 800 },
  };

  static readonly FUNDAMENTAL_PORTFOLIO: ScreenDefinition = {
    name: 'fundatamental_portfolio',
    title: 'Fundamental Portfolio',
    sizes: { width: 1080, height: 800 },
  };

  static readonly CLICK_ORDER: ScreenDefinition = {
    name: 'click_order',
    title: 'Click Order',
    sizes: { width: 768, height: 1080 },
  };

  static readonly DERIVATIVE_TRADE_HISTORY: ScreenDefinition = {
    name: 'derivative_trade_history',
    title: 'Derivative Trade History',
    sizes: { width: 1080, height: 800 },
  };

  static readonly DERIVATIVE_PORTFOLIO: ScreenDefinition = {
    name: 'derivative_portfolio',
    title: 'Derivative Portfolio',
    sizes: { width: 1080, height: 800 },
  };

  static readonly INFO_TICK_CHART: ScreenDefinition = {
    name: 'info_tick_chart',
    title: 'Info Tick Chart',
    sizes: { width: 1080, height: 800 },
  };

  static readonly INFO_COMBINE_CHART: ScreenDefinition = {
    name: 'info_combine_chart',
    title: 'Info Combine Chart',
    sizes: { width: 1080, height: 800 },
  };

  static readonly ALGORITHM_1: ScreenDefinition = {
    name: 'algorithm_1',
    title: 'Algorithm 1',
    sizes: { width: 1080, height: 800 },
  };

  static readonly ALGORITHM_1_SECTOR_CHARTS: ScreenDefinition = {
    name: 'algorithm_1_sectors_charts',
    title: 'Algorithm 1 Sector Charts',
    sizes: { width: 1080, height: 800 },
  };

  static readonly ALGORITHM_KOSPI_USD: ScreenDefinition = {
    name: 'algorithm_kospi_usd',
    title: 'Algorithm KOSPI USD',
    sizes: { width: 1024, height: 640 },
  };

  static readonly ALGORITHM_STOCK_WATCH: ScreenDefinition = {
    name: 'algorithm_stock_watch',
    title: 'Algorithm Stock Watch',
    sizes: { width: 1024, height: 640 },
  };
}

export const MarketDataScreens = [Screens.CLICK_ORDER.name];
export const QTSMarketDataScreens = [Screens.ALGORITHM_1.name, Screens.ALGORITHM_1_SECTOR_CHARTS.name];
