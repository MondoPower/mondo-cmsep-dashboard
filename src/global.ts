import 'src/api/data-component';

import { initModalInteraction } from './ui/info-modals';

window.Webflow?.push(() => {
  initModalInteraction();
});
