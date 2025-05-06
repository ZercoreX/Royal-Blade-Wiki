// page data meta
const KEY_TAB_META = "tab";

const CURRENT_PAGE_META = document.querySelector("meta[name=page]");
const CURRENT_TAB_META = document.querySelector("meta[name=tab]");

// elements
const pagesNav = document.querySelector("nav[name=pages-nav]");

const tabsSection = document.querySelector(".tabs-section");
const tabsNav = document.querySelector("nav[name=tabs-nav]");
const tabNavButtons = tabsNav.querySelectorAll("button");

function UpdatePageTitle() {
  document.title = `${CURRENT_PAGE_META.content} - ${CURRENT_TAB_META.content}`;
}

export function InitTabSwitcher() {
  // selects the active page button
  const pageLinks = pagesNav.querySelectorAll("a");
  pageLinks.forEach((link) => {
    if (link.getAttribute("page-data") === CURRENT_PAGE_META.content) {
      link.classList.add("active");
    }
  });

  // open the default tab
  const defaultTab = tabsSection.querySelector(`#${CURRENT_TAB_META.content}`);
  defaultTab?.classList.add("active");

  // open the saved tab
  const urlParams = new URLSearchParams(window.location.search);
  const tabQuery = urlParams.get(KEY_TAB_META);

  let savedTab = tabQuery || sessionStorage.getItem(KEY_TAB_META) || CURRENT_TAB_META.content;
  let activeTab = tabsSection.querySelector(`#${savedTab}`);

  // if the saved tab not found fallback to the first tab in the section
  if (!activeTab) {
    const fallbackTab = tabNavButtons[0].getAttribute("tab-data");
    sessionStorage.setItem(KEY_TAB_META, fallbackTab);
    activeTab = tabsSection.querySelector(`#${fallbackTab}`);
    savedTab = fallbackTab;
  }

  // closes the old active tab and opens the new one
  if (activeTab) {
    tabsSection.querySelector(".active")?.classList.remove("active");
    activeTab.classList.add("active");
    CURRENT_TAB_META.setAttribute("content", savedTab);
  }

  UpdatePageTitle();

  // tab nav buttons
  tabNavButtons.forEach((button) => {
    const tabData = button.getAttribute("tab-data");

    // if the current tab is the same as the button make it active
    if (tabData === CURRENT_TAB_META.content) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      if (!button.classList.contains("active")) {
        tabsNav.querySelector(".active")?.classList.remove("active");
        button.classList.add("active");

        // close the old tab
        tabsSection.querySelector(".tab.active")?.classList.remove("active");
        // open the selected tab
        tabsSection.querySelector(`#${tabData}`).classList.add("active");

        // update the current tab meta
        CURRENT_PAGE_META.setAttribute("content", tabData);

        // set the current tab in session storage
        sessionStorage.setItem(KEY_TAB_META, tabData);

        // update the url
        const url = new URL(window.location);
        url.searchParams.set("tab", tabData);
        history.pushState(null, "", url);

        UpdatePageTitle();
      }

      // closes the nav when a tab is selected (effected on smaller screens only)
      if (tabsNav.classList.contains("show")) {
        tabsNav.classList.remove("show");
      }
    });
  });
}
