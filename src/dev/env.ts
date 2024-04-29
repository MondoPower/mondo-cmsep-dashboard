import type { SCRIPTS_ENV } from 'global';

const ENV_LOCALSTORAGE_ID = 'jsEnv';

window.SCRIPTS_ENV = getENV();

window.setScriptsENV = (env) => {
  if (env !== 'dev' && env !== 'prod') {
    console.error('Invalid environment. Pass `dev` or `prod`');
    return;
  }

  localStorage.setItem(ENV_LOCALSTORAGE_ID, env);
  window.SCRIPTS_ENV = env;
  console.log(`Environment successfully set to ${env}`);
};

function getENV(): SCRIPTS_ENV {
  const localStorageItem = localStorage.getItem(ENV_LOCALSTORAGE_ID) as SCRIPTS_ENV;
  return localStorageItem || 'prod';
}

export {};
