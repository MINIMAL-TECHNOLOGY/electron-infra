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
