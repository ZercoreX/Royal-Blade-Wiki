import { GetSheet } from './database-fetch.js';
import { messageDisplay } from './message-display.js';

let pageMeta = document.querySelector('meta[name=page]');
let page_database = {
  Home: { Updates:"Update-Notes", News:"News" },
};

async function fetchDataBase() {
  const currentBase = page_database[pageMeta.content];

  for (const [key, value] of Object.entries(currentBase)) {
    if (pageMeta.content == "Home") {
      messageDisplay(key,await GetSheet(key, value));
    }
  }
}

let load = true; //incase wanted to switch the database on/off
function initDataBase() {
  if (load) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded',fetchDataBase);
    } else {
      fetchDataBase();
    }
  }
}

export { initDataBase };