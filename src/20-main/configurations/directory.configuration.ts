import { app } from 'electron';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Constants } from '@Common/constants';

console.log('[DirectoryConfiguration][configure] Configuring application directories...');

const Directories = {
  APP_DATA_FOLDER: '',
  LOG_FOLDER: '',
  DATABASE_FOLDER: '',
};

const appFolder = resolve(
  join(process.env.NODE_ENV !== 'development' ? app.getPath('userData') : '.', Constants.APPLICATION_FOLDER),
);
const folders: Record<string, { path: string; result: boolean }> = {
  appData: { path: appFolder, result: false },
  logs: { path: join(appFolder, 'logs'), result: false },
  databases: { path: join(appFolder, 'databases'), result: false },
};

for (const folderKey in folders) {
  const { path: folderPath } = folders[folderKey];
  if (existsSync(folderPath)) {
    folders[folderKey].result = true;
    continue;
  }

  const isCreatedSuccesfully = mkdirSync(folderPath, { recursive: true }) !== undefined;
  console.log(`[DirectoryConfiguration][configure] Create folder ${folderPath} | Result: ${isCreatedSuccesfully}`);

  if (!isCreatedSuccesfully) {
    throw new Error(`[Directory] Cannot create directory ${folderKey}`);
  } else {
    folders[folderKey].result = isCreatedSuccesfully;
  }
}

Directories.APP_DATA_FOLDER = folders.appData.path;
Directories.LOG_FOLDER = folders.logs.path;
Directories.DATABASE_FOLDER = folders.databases.path;

export { Directories };
