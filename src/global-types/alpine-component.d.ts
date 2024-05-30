/**
 * Overrides some core interfaces from AlpineJS to provide type safety
 */
import type { AlpineMagics } from 'alpinejs';

// Forked from original `XData` definition for `@types/alpinejs`
export type XData = XDataContext | string | number | boolean;

// Forked from original `XDataContext` definition for `@types/alpinejs`
interface XDataContext {
  /**
   * Will be executed before Alpine initializes the rest of the component.
   */
  init?(): void;
  [stateKey: string]: any;
}

/**
 * Define all custom stores
 */
export interface AlpineStoreExtensions {}

// Extend AlpineMagics type to include our custom stores
interface customMagics<T> extends AlpineMagics<T> {
  $store: AlpineStoreExtensions;
}

// Forked from original `AlpineComponent` definition from `@types/alpinejs`
export type CustomAlpineComponent<T = Record<string, any>> = T &
  XDataContext &
  ThisType<T & XDataContext & customMagics<T>>;
