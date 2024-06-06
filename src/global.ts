import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'src/api/data-component';

import { initModalInteraction } from './ui/info-modals';

// put dayjs in the global scope
globalThis.dayjs = dayjs;

window.Webflow?.push(() => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);

  // set default dayjs timezone as victoria australia
  dayjs.tz.setDefault('Australia/Victoria');

  initModalInteraction();
});
