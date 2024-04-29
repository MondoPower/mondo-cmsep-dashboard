const DEBUG_MODE_LOCALSTORAGE_ID = 'IS_DEBUG_MODE';

window.IS_DEBUG_MODE = getDebugMode();

window.DEBUG = function (...args) {
  if (window.IS_DEBUG_MODE) {
    console.log(...args);
  }
};

window.setDebugMode = (mode) => {
  localStorage.setItem(DEBUG_MODE_LOCALSTORAGE_ID, mode.toString());
};

export function getDebugMode(): boolean {
  const localStorageItem = localStorage.getItem(DEBUG_MODE_LOCALSTORAGE_ID);
  if (localStorageItem && localStorageItem === 'true') {
    return true;
  }
  return false;
}
