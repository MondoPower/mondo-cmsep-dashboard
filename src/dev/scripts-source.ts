import type { SCRIPTS_SOURCES } from '$types/global';

const ENV_LOCALSTORAGE_ID = 'jsEnv';

window.SCRIPTS_ENV = getScriptSource();

window.setScriptSource = (env) => {
  if (env !== 'local' && env !== 'cdn') {
    console.error('Invalid environment. Pass `local` or `cdn`');
    return;
  }

  localStorage.setItem(ENV_LOCALSTORAGE_ID, env);
  window.SCRIPTS_ENV = env;
  console.log(`Environment successfully set to ${env}`);
};

function getScriptSource(): SCRIPTS_SOURCES {
  const localStorageItem = localStorage.getItem(ENV_LOCALSTORAGE_ID) as SCRIPTS_SOURCES;
  return localStorageItem || 'cdn';
}

export {};
