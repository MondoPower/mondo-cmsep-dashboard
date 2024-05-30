import type { Alpine } from 'alpinejs';

import type { CustomAlpineComponent, XData } from './alpine-component';

/**
 * Custom Alpine interface to provide type safety
 */
interface CustomAlpine extends Alpine {
  /**
   * Retrieves state in the global store.
   *
   * @param name state key
   */
  store<K extends keyof AlpineStoreExtensions>(name: K): AlpineStoreExtensions[K];
  /**
   * Sets state in the global store.
   *
   * @param name state key
   * @param value the initial state value
   */
  store(name: string, value: XData): void;
  /**
   * Provides a way to reuse x-data contexts within your application.
   *
   * @param name the id of the x-data context
   * @param callback the initializer of the x-data context
   */
  data(name: string, callback: (...initialStateArgs: unknown[]) => CustomAlpineComponent): void;
}

declare global {
  interface Window {
    Alpine: CustomAlpine;
  }
}

export {};
