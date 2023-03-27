export class ApplicationActions {
  static readonly APPLICATION_START: string = '@QT/application/start-up';
  static readonly APPLICATION_CONFIGURE: string = '@QT/application/do-configure';
  static readonly APPLICATION_CLEAN_UP: string = '@QT/application/clean-up';
}

export class RouteActions {
  static readonly ROUTE_NEW_SCREEN: string = '@QT/menu/route-new-screen';
  static readonly ROUTE_OBSERVE_TO_WINDOW: string = '@QT/menu/route-observe-to-window';
}
