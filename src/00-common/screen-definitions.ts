import { ScreenDefinition } from '@Common/types';

export class Screens {
  static readonly PREFIX = 'qt_kts';

  static readonly WELCOME: ScreenDefinition = {
    name: 'welcome',
    title: 'Welcome',
    sizes: { width: 1366, height: 768 },
  };
  static readonly HOME: ScreenDefinition = {
    name: 'home',
    title: 'Home',
    sizes: { width: 1366, height: 768 },
  };
}
