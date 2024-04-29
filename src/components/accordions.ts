const ITEM_SELECTOR = 'details';
const TOGGLE_SELECTOR = 'summary';
const CONTENT_SELECTOR = 'summary + div';

const ANIMATION_DURATION_IN_MS = 300;
/**
 * If set to true, will close all other accordions when one is opened
 */
const CLOSE_OTHER_ACCORDIONS = true;

export function animatedDetailsAccordions() {
  const accordionsList = document.querySelectorAll<HTMLDetailsElement>(ITEM_SELECTOR);
  accordionsList.forEach((accordion) => {
    const accordionToggleEl = accordion.querySelector(TOGGLE_SELECTOR);
    const accordionContentEl = accordion.querySelector(CONTENT_SELECTOR);

    if (!accordionToggleEl || !accordionContentEl) {
      console.error('Accordion toggle or content not found', accordionToggleEl, accordionContentEl);
      return;
    }

    accordionToggleEl.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpening = !accordion.open;

      if (isOpening) {
        const height = accordionContentEl.scrollHeight;
        accordionContentEl.style.height = '0px';
        accordion.open = true;
        accordionContentEl.animate([{ height: '0px' }, { height: `${height}px` }], {
          duration: ANIMATION_DURATION_IN_MS,
          fill: 'forwards',
        }).onfinish = () => {
          accordionContentEl.style.height = 'auto';
        };

        if (CLOSE_OTHER_ACCORDIONS) {
          accordionsList.forEach((otherAccordion) => {
            if (otherAccordion !== accordion && otherAccordion.open) {
              otherAccordion.querySelector(TOGGLE_SELECTOR)?.click();
            }
          });
        }
      } else {
        const height = accordionContentEl.scrollHeight;
        const animation = accordionContentEl.animate(
          [{ height: `${height}px` }, { height: '0px' }],
          {
            duration: ANIMATION_DURATION_IN_MS,
            fill: 'forwards',
          }
        );

        animation.onfinish = () => {
          accordion.open = false;
          accordionContentEl.style.height = '';
        };
      }
    });
  });
}
