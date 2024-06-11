interface APIResponse {
  townName: string;
  timestamp: number;
  batteries: {
    capacity: {
      unit: string;
      value: number;
    };
    stateOfCharge: {
      unit: string;
      value: number;
    };
  };
  exportingToGrid: {
    unit: string;
    value: number;
  };
  numberOfSystems: number;
  solar: {
    capacity: {
      unit: string;
      value: number;
    };
    generating: {
      unit: string;
      value: number;
    };
  };
  status:
    | 'Exporting'
    | 'Pre-event resilience mode – charging'
    | 'Resilience mode – conserve energy';
  townSupplyStatus: 'Grid connected' | 'Islanded';
}
