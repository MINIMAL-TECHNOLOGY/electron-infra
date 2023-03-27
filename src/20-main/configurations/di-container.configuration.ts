export class DIContainer {
  private container: {};
  private static instance: DIContainer;

  constructor() {
    this.container = {};
  }

  static getInstance(): DIContainer {
    if (!this.instance) {
      this.instance = new DIContainer();
    }

    return this.instance;
  }

  bind<T>(key: string, value: T): void {
    this.container[key] = value;
  }

  get<T>(key: string): T | null {
    return this.container[key] as T;
  }
}
