let KEY_DARKMODE = "darkmode";
// ============
let darkmode = localStorage.getItem(KEY_DARKMODE);

function enableDarkMode() {
  document.documentElement.classList.add(KEY_DARKMODE);
  localStorage.setItem(KEY_DARKMODE, "active");
}

function disableDarkMode() {
  document.documentElement.classList.remove(KEY_DARKMODE);
  localStorage.setItem(KEY_DARKMODE, null);
}

if (darkmode === "active") enableDarkMode();

// =============================
export function initDarkMode() {
  let ThemeSwitch = document.getElementById("theme-switch");
  ThemeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem(KEY_DARKMODE);
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
  });
}
