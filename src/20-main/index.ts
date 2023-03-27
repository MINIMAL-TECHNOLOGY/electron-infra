import { app } from 'electron';

import { Application } from './application';
import { logger } from '@Main/services';

const environment = process.env.NODE_ENV;
const application: Application = new Application(app);

app.on('will-finish-launching', () => {
  logger.info('[Application] Application is launching with environment: %s', environment);
});

app.on('ready', async () => {
  try {
    await application.configure();
    application.start();
  } catch (error) {
    console.log('[Application][ready] Error: ', error);
  }
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('before-quit', () => {
  application?.stop();
});
