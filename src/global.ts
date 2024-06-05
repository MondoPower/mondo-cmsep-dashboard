import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'src/api/data-component';

import { initModalInteraction } from './ui/info-modals';

// put dayjs in the global scope
globalThis.dayjs = dayjs;

window.Webflow?.push(() => {
  dayjs.extend(relativeTime);

  initModalInteraction();
});
