import { logger, MainEventService } from '@Main/services';
import { IHandler } from '@Common/types';

export abstract class BaseHandler implements IHandler {
  name: string;
  eventHandler: MainEventService;

  constructor(props: { name: string }) {
    this.name = props.name;
    logger.info(`Initializing ${this.name}...!`);
    this.eventHandler = MainEventService.getInstance();
  }

  abstract handle(): void;
}
