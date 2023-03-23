import { Logger, createLogger } from 'winston';
import 'winston-daily-rotate-file';

import { logFormatter, logTransports } from '@Main/configurations';
import { AnyType } from '@Common/types';

const defaultLogger: Logger = createLogger({
  format: logFormatter,
  exitOnError: false,
  transports: [logTransports.console, logTransports.info, logTransports.error],
  exceptionHandlers: [logTransports.console, logTransports.error],
});

export const logger = {
  info(message: string, ...args: AnyType[]): void {
    defaultLogger.log('info', message, ...args);
  },
  error(message: string, ...args: AnyType[]): void {
    defaultLogger.log('error', message, ...args);
  },
};
