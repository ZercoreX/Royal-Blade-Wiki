import { initDarkMode } from "./darkmode.js";
import { initNavLoader } from "./nav.js";
import { InitTabSwitcher } from "./tabs.js";

// Run after DOM is ready - DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  InitTabSwitcher();
  initDarkMode();
  initNavLoader();
});
