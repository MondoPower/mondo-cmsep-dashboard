import type { CustomAlpineComponent } from '$types/alpine-component';

const COMPONENT_NAME = 'statItem';
const INFO_ACTIVE_CLASS = 'is-info-active';

interface StatsItemComponent {
  /** Whether info mode is active on tablet and below */
  isInfoMode: boolean;
  itemAttr: object;
  /** Desktop tooltip trigger element listeners */
  desktopTooltipTriggerAttr: object;
  /** Tablet info trigger element listeners */
  tabletInfoTriggerAttr: object;
  /** Toggles the popover element */
  showPopover: boolean;
}

document.addEventListener('alpine:init', () => {
  window.Alpine.data(COMPONENT_NAME, function () {
    return {
      // defaults
      isInfoMode: false,
      showPopover: false,

      itemAttr: {
        [':class']() {
          return this.isInfoMode && INFO_ACTIVE_CLASS;
        },
      },

      desktopTooltipTriggerAttr: {
        ['tabindex']: '0',
        ['@mouseenter']() {
          this.showPopover = true;
        },
        ['@mouseleave']() {
          this.showPopover = false;
        },
        ['@focus']() {
          this.showPopover = true;
        },
        ['@blur']() {
          this.showPopover = false;
        },
        ['@keyup.escape']() {
          this.showPopover = false;
        },
      },

      tabletInfoTriggerAttr: {
        ['@click']() {
          this.isInfoMode = !this.isInfoMode;
        },
      },
    } as CustomAlpineComponent<StatsItemComponent>;
  });
});
