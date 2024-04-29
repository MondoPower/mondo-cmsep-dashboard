/**
 * Entry point for the build system.
 * Fetches scripts from localhost or production site depending on the setup
 * Polls `localhost` on page load, else falls back to deriving code from production URL
 */
import { SCRIPTS_LOADED_EVENT } from './constants';
import './dev/debug';
import './dev/env';

const LOCALHOST_BASE = 'http://localhost:3000/';
const PRODUCTION_BASE = 'https://cdn.jsdelivr.net/gh/igniteagency/{{repo}}/dist/prod/';

window.JS_SCRIPTS = new Set();

const SCRIPT_LOAD_PROMISES: Array<Promise<unknown>> = [];

// init adding scripts to the page
window.addEventListener('DOMContentLoaded', addJS);

/**
 * Sets an object `window.isLocal` and adds all the set scripts using the `window.JS_SCRIPTS` Set
 */
function addJS() {
  console.log(`Current mode: ${window.SCRIPTS_ENV}`);

  if (window.SCRIPTS_ENV === 'dev') {
    fetchLocalScripts();
  } else {
    appendScripts();
  }
}

function appendScripts() {
  const BASE = window.SCRIPTS_ENV === 'dev' ? LOCALHOST_BASE : PRODUCTION_BASE;

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
    window.DEBUG('All scripts loaded');
    window.dispatchEvent(new CustomEvent(SCRIPTS_LOADED_EVENT));
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
      window.setScriptsENV('prod');
    })
    .finally(() => {
      clearTimeout(localhostFetchTimeout);
      appendScripts();
    });
}
