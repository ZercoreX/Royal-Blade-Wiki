export function initNavLoader() {
  // ============ nav toggle button
  let Toggles = document.querySelectorAll(".nav-toggle");

  Toggles.forEach((toggle) => {
    let target = document.querySelector(`nav[name="${toggle.getAttribute("target")}"]`);
    toggle.addEventListener("click", () => {
      target.classList.toggle("show");
      toggle.classList.toggle("active");
    });
  });

  // =========== scroll to top button
  let ScrollToTop = document.querySelector(".scroll-to-top");

  window.onscroll = function () {
    this.scrollY >= 1000 ? ScrollToTop.classList.add("show") : ScrollToTop.classList.remove("show");
  };

  ScrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}
