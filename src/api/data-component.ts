import { Dayjs } from 'dayjs';
import type { CustomAlpineComponent } from 'src/global-types/alpine-component';

const COMPONENT_NAME = 'stats';

const DATA_ENDPOINT = `http://backend.cmsep.mondopower.com.au/${townName}.json`;
const POLL_TIME_MS = 5000;

interface StatsComponent {
  townName: string;
  lastUpdated: string;

  numberOfSystems: string;

  status: string;
  statusText: string;
  isExporting: () => boolean;
  isPreEventResilience: () => boolean;
  isResilience: () => boolean;

  batteryCapacity: string;
  batteryChargeState: string;

  /**
   * Alpine lifecycle function
   */
  init(): void;
  /**
   * Fetch the town data from the set endpoint, and assign it to the respective component properties
   */
  queryData(): Promise<void>;
  /**
   * Re-query data every set interval
   */
  initPolling(): void;
}

window.addEventListener('alpine:init', () => {
  window.Alpine.data(COMPONENT_NAME, function () {
    return {
      townName: '',

      init() {
        this.queryData();
        this.initPolling();
      },

      async queryData() {
        try {
          const response = await fetch(DATA_ENDPOINT);
          const data = await response.json();

          console.debug('Data fetched', data);
        } catch (error) {
          console.error('Error in fetching the data', error);
        }
      },

      initPolling() {
        try {
          setInterval(this.queryData, POLL_TIME_MS);
        } catch (error) {
          console.error('Error in polling the data', error);
        }
      },
    } as CustomAlpineComponent<StatsComponent>;
  });
});
