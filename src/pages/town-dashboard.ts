import { SCRIPTS_LOADED_EVENT } from 'src/constants';

import { initStatsItemComponent } from '$ui_components/stat-item';
import { initStatsComponent } from '$ui_components/stats';

window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
  initStatsComponent();
  initStatsItemComponent();
});
