import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';
import isEmpty from 'lodash/isEmpty';

import { Constants } from '@Common/constants';
import { Directories } from '@Main/configurations';

console.log('[LogService][configure] Configuring application logger...');

const logFileOpts: Record<string, string> = {
  frequency: '1h',
  maxSize: '100m',
  datePattern: 'YYYYMMDD_HH',
};

const logFolder = Directories.LOG_FOLDER;
if (isEmpty(logFolder)) {
  console.error('Log Folder has not configured yet!');
  throw new Error('[getLogger] Invalid LOG_FOLDER!');
}

export const logTransports = {
  console: new transports.Console({}),
  info: new transports.DailyRotateFile({
    ...logFileOpts,
    filename: join(logFolder, 'qt_kts-info-%DATE%.log'),
    level: 'info',
  }),
  error: new transports.DailyRotateFile({
    ...logFileOpts,
    filename: join(logFolder, 'qt_kts-error-%DATE%.log'),
    level: 'error',
  }),
};

const { label, splat, align, timestamp, simple, colorize, printf, combine } = format;
export const logFormatter = combine(
  label({ label: Constants.APPLICATION_NAME }),
  splat(),
  align(),
  timestamp(),
  simple(),
  colorize(),
  printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`),
);
