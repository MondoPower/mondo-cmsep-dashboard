/**
 * Entry point for the build system.
 * Fetches scripts from localhost or production site depending on the setup
 * Polls `localhost` on page load, else falls back to deriving code from production URL
 */
import { SCRIPTS_LOADED_EVENT } from './constants';
import './dev/scripts-source';

const LOCALHOST_BASE = 'http://localhost:3000/';
window.PRODUCTION_BASE = 'https://cdn.jsdelivr.net/gh/MondoPower/mondo-cmsep-dashboard/dist/prod/';

/**
 * NOTE: For multiple environments, can perhaps add separate production base URLs by matching the domain
 * E.g: for UAT, can create a separate branch called `uat`, and the production base URL can look like - https://cdn.jsdelivr.net/gh/MondoPower/mondo-cmsep-dashboard@uat/dist/prod/entry.js
 * Remember to purge the branch URL cache for all files to view the updated build code on live site
 */

window.JS_SCRIPTS = new Set();

const SCRIPT_LOAD_PROMISES: Array<Promise<unknown>> = [];

// init adding scripts to the page
window.addEventListener('DOMContentLoaded', addJS);

/**
 * Adds all the set scripts to the `window.JS_SCRIPTS` Set
 */
function addJS() {
  console.debug(`Current script mode: ${window.SCRIPTS_ENV}`);

  if (window.SCRIPTS_ENV === 'local') {
    console.debug(
      "To run JS scripts from production CDN, execute `window.setScriptSource('cdn')` in the browser console"
    );
    fetchLocalScripts();
  } else {
    console.debug(
      "To run JS scripts from localhost, execute `window.setScriptSource('local')` in the browser console"
    );
    appendScripts();
  }
}

function appendScripts() {
  const BASE = window.SCRIPTS_ENV === 'local' ? LOCALHOST_BASE : window.PRODUCTION_BASE;

  window.JS_SCRIPTS?.forEach((url) => {
    const script = document.createElement('script');
    script.src = BASE + url;
    script.defer = true;

    const promise = new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = () => {
        console.error(`Failed to load script: ${url}`);
        reject;
      };
    });

    SCRIPT_LOAD_PROMISES.push(promise);

    document.body.appendChild(script);
  });

  Promise.allSettled(SCRIPT_LOAD_PROMISES).then(() => {
    console.debug('All scripts loaded');
    // Add a small delay to ensure all scripts have had a chance to execute
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent(SCRIPTS_LOADED_EVENT));
    }, 50);
  });
}

function fetchLocalScripts() {
  const LOCALHOST_CONNECTION_TIMEOUT_IN_MS = 300;
  const localhostFetchController = new AbortController();

  const localhostFetchTimeout = setTimeout(() => {
    localhostFetchController.abort();
  }, LOCALHOST_CONNECTION_TIMEOUT_IN_MS);

  fetch(LOCALHOST_BASE, { signal: localhostFetchController.signal })
    .then((response) => {
      if (!response.ok) {
        console.error({ response });
        throw new Error('localhost response not ok');
      }
    })
    .catch(() => {
      console.error('localhost not resolved. Switching to production');
      window.setScriptSource('cdn');
    })
    .finally(() => {
      clearTimeout(localhostFetchTimeout);
      appendScripts();
    });
}
