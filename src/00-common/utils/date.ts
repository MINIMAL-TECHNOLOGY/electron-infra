import { Constants } from '@Common/constants';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(CustomParseFormat);
dayjs.extend(timezone);
dayjs.tz.setDefault(Constants.APPLICATION_TIMEZONE);

export default dayjs;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
