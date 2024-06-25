import type { CustomAlpineComponent } from '$types/alpine-component';

const COMPONENT_NAME = 'statItem';

interface StatsItemComponent {
  /** Toggle the info popover */
  showPopover(): void;
  /** Hide the info popover */
  hidePopover(): void;
  /** Whether info mode is active on tablet and below */
  isInfoMode: boolean;
}

document.addEventListener('alpine:init', () => {
  window.Alpine.data(COMPONENT_NAME, function () {
    return {
      showPopover() {
        const popoverEl = this.$el.querySelector('[popover]');
        if (!popoverEl) {
          return;
        }

        if (window.innerWidth > 991) {
          // Position the popover on desktop
          const { top, left } = this.$el.getBoundingClientRect();
          const calcTopEdge = top;
          let calcLeftEdge = left - 600; // 500px = arbitrary width of the info element + gap
          if (calcLeftEdge < 0) {
            calcLeftEdge = 15;
          }

          Object.assign(popoverEl.style, {
            left: `${calcLeftEdge}px`,
            top: `${calcTopEdge}px`,
          });
        }

        popoverEl.showPopover();
      },

      hidePopover() {
        if (this.$el.getAttribute('x-ref') === 'popoverCloseIcon') {
          // trigger is the mobile popover close icon
          this.$el.closest('[popover]')?.hidePopover();
        } else {
          this.$el.querySelector('[popover]')?.hidePopover();
        }
      },
    } as CustomAlpineComponent<StatsItemComponent>;
  });
});
