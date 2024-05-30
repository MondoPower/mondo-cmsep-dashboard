import Alpine from 'alpinejs';
import { SCRIPTS_LOADED_EVENT } from 'src/constants';

/**
 * Support template syntax and replaces `:` with `.` notation for Webflow elements
 * @link https://github.com/loomchild/webflow-alpinejs
 */
class AlpineJSWebflow {
  constructor() {
    window.Alpine = Alpine;

    // Execute after all scripts are loaded
    window.addEventListener(SCRIPTS_LOADED_EVENT, () => {
      this.init();
      window.Alpine.start();
    });
  }

  private init() {
    document.querySelectorAll<HTMLElement>('[x-data],[x-data] *').forEach((el) => {
      this.replaceDotAttributes(el);
      this.removeUnnecessaryAttributeValues(el);
    });

    document
      .querySelectorAll<HTMLElement>(
        '[x-data] [x-for]:not(template), [x-data] [x-if]:not(template)'
      )
      .forEach((el) => this.wrapInTemplate(el));
  }

  private getAlpineAttributes(el: HTMLElement) {
    const alpineAttributes = [];
    for (let i = 0; i < el.attributes.length; ++i) {
      const a = el.attributes[i];
      if (a.name.startsWith('x-')) {
        alpineAttributes.push(a);
      }
    }
    return alpineAttributes;
  }

  private wrapInTemplate(el: HTMLElement) {
    const template = document.createElement('template');

    const attributes = this.getAlpineAttributes(el);

    attributes.forEach((a) => {
      template.setAttribute(a.name, a.value);
      el.removeAttribute(a.name);
    });

    el.parentNode?.insertBefore(template, el);
    template.content.appendChild(el);
  }

  private replaceDotAttributes(el: HTMLElement) {
    const attributes = this.getAlpineAttributes(el);

    attributes.forEach((a) => {
      const m = a.name.match(/^(x-[^:]+)(:.+)$/);
      if (m) {
        let newA = null;
        if (['x-bind', 'x-on'].includes(m[1])) {
          let prefix = m[1];
          let suffix = m[2].substring(1);
          if (prefix === 'x-on' && suffix.startsWith('update:')) {
            prefix += ':update';
            suffix = suffix.substring(7);
          }
          if (suffix.includes(':')) {
            newA = prefix + ':' + suffix.replace(/:/g, '.');
          }
        } else {
          newA = m[1] + m[2].replace(/:/g, '.');
        }
        if (newA) {
          el.setAttribute(newA, a.value);
          el.removeAttribute(a.name);
        }
      }
    });
  }

  private removeUnnecessaryAttributeValues(el: HTMLElement) {
    const attributes = this.getAlpineAttributes(el);

    attributes.forEach((a) => {
      if (a.name.match(/^x-transition.*(?!(enter|leave))/)) {
        el.setAttribute(a.name, '');
      }
    });
  }
}

new AlpineJSWebflow();
