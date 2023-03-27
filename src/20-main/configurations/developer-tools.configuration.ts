import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { logger } from '@Main/services';

export default async () => {
  const tools = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  logger.info('[Application][configureDeveloperTools] Installing developer tools');

  for (const tool of tools) {
    try {
      const toolName = await installExtension(tool);
      logger.info('[Application][configureDeveloperTools] Installed %s', toolName);
    } catch (error) {
      logger.error('[Application][configureDeveloperTools] Fail to install developer tools!');
      console.log(error);
    }
  }
};
