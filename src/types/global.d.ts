import type { Webflow } from '@finsweet/ts-utils';

export type SCRIPTS_SOURCES = 'local' | 'cdn';

declare global {
  const dayjs: typeof import('dayjs');
}

declare global {
  interface Window {
    JS_SCRIPTS: Set<string> | undefined;
    Webflow: Webflow;

    SCRIPTS_ENV: ENV;
    setScriptSource(env: ENV): void;

    PRODUCTION_BASE: string;

    /**
     * window.townName to be defined in HTML that determines the town data fetch endpoint
     */
    townName: string;
  }

  // Extend `querySelector` and `querySelectorAll` function to stop the nagging of converting `Element` to `HTMLElement` all the time
  interface ParentNode {
    querySelector<E extends HTMLElement = HTMLElement>(selectors: string): E | null;
    querySelectorAll<E extends HTMLElement = HTMLElement>(selectors: string): NodeListOf<E>;
  }
}

export {};
