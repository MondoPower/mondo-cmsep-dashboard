import type { CustomAlpineComponent } from '$types/alpine-component';

const COMPONENT_NAME = 'stats';

const DATA_ENDPOINT = `https://cmsep-backend.mondopower.com.au/${townName}.json`;
const POLL_TIME_MS = 1 * 60 * 1000; // 1 minute

interface StatsComponent {
  townName: string;
  lastUpdated: string;

  numberOfSystems: string;

  isExporting: boolean;
  isPreStormResilience: boolean;
  isResilience: boolean;

  gridExportCount: string;

  isGridConnected: boolean;
  isIslanded: boolean;

  solarGenerating: string;
  solarCapacity: string;
  solarGeneratingPercent: number;

  batteryChargeState: string;
  batteryCapacity: string;
  batteryChargePercent: number;

  /** Flag to indicate if there was an API error */
  isError: boolean;

  /** Alpine lifecycle function */
  init(): void;
  /** Fetch the town data from the set endpoint, and assign it to the respective component properties */
  queryData(): Promise<void>;
  /** Re-query data every set interval */
  initPolling(): void;
}

document.addEventListener('alpine:init', () => {
  window.Alpine.data(COMPONENT_NAME, function () {
    return {
      // Setting defaults
      townName: '',
      lastUpdated: dayjs().tz().fromNow(),

      numberOfSystems: '',

      isExporting: false,
      isPreStormResilience: false,
      isResilience: false,

      gridExportCount: '',

      isGridConnected: false,
      isIslanded: false,

      solarGenerating: '',
      solarCapacity: '',
      solarGeneratingPercent: 0,

      batteryChargeState: '',
      batteryCapacity: '',
      batteryChargePercent: 0,

      isError: false,

      init() {
        this.queryData();
        this.initPolling();
      },

      async queryData() {
        try {
          const response = await fetch(DATA_ENDPOINT);
          const data = (await response.json()) as APIResponse;

          this.isError = false;

          console.debug('API Data fetched', data);

          this.townName = data.townName;

          this.lastUpdated = dayjs().tz().to(data.timestamp);

          this.numberOfSystems = data.numberOfSystems.toString();

          this.isExporting = data.status === 'Exporting';
          this.isPreStormResilience = data.status === 'Pre-event resilience mode – charging';
          this.isResilience = data.status === 'Resilience mode – conserve energy';

          this.gridExportCount = data.exportingToGrid.value + data.exportingToGrid.unit;

          this.isGridConnected = data.townSupplyStatus === 'Grid connected';
          this.isIslanded = data.townSupplyStatus === 'Islanded';

          this.solarGenerating = data.solar.generating.value + data.solar.generating.unit;
          this.solarCapacity = data.solar.capacity.value + data.solar.capacity.unit;
          this.solarGeneratingPercent =
            (data.solar.generating.value / data.solar.capacity.value) * 100;

          this.batteryChargeState =
            data.batteries.stateOfCharge.value + data.batteries.stateOfCharge.unit;
          this.batteryCapacity = data.batteries.capacity.value + data.batteries.capacity.unit;
          this.batteryChargePercent = data.batteries.stateOfCharge.value;
        } catch (error) {
          this.isError = true;
          console.error('Error in fetching the data', error);
        }
      },

      initPolling() {
        try {
          setInterval(() => {
            this.queryData();
          }, POLL_TIME_MS);
        } catch (error) {
          this.isError = true;
          console.error('Error in polling the data', error);
        }
      },
    } as CustomAlpineComponent<StatsComponent>;
  });
});
