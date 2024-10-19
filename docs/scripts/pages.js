// Cache meta and navigation elements
const pageMeta = document.querySelector('meta[name=page]');
const tabMeta = document.querySelector('meta[name=tab]');
const pagesNav = document.querySelector('nav');
const pageSectionContainer = document.querySelector(".page-section");
const tabsNav = document.querySelector(".left-nav-ul");

// Set the active page button to active
const pagesButtons = pagesNav.querySelectorAll('a');
pagesButtons.forEach(pButton => {
    if (pButton.getAttribute('page-data') === pageMeta.content) {
        pButton.classList.add("active");
    }
});

// Load and manage tabs
const tabButtons = tabsNav.querySelectorAll("button");

function checklink() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTab = urlParams.get('tab');

    if (selectedTab) {
        tabMeta.setAttribute('content', selectedTab);
        return selectedTab;
    }
}

function loadTab() {
    const activeTab = pageSectionContainer.querySelector(`#${tabMeta.content}`);
    activeTab?.classList.add("active");
    
    let savedTab = checklink() || sessionStorage.getItem('tab-meta') || tabMeta.content;
    let activeTabSection = pageSectionContainer.querySelector(`#${savedTab}`);
    
    if (!activeTabSection) {
        const fallbackTab = tabButtons[0].getAttribute('tab-data');
        sessionStorage.setItem('tab-meta', fallbackTab);
        activeTabSection = pageSectionContainer.querySelector(`#${fallbackTab}`);
        savedTab = fallbackTab;
    }
    
    if (activeTabSection) {
        pageSectionContainer.querySelector(".active")?.classList.remove("active");
        activeTabSection.classList.add("active");
        tabMeta.setAttribute('content', savedTab);
    }

    document.title = `${pageMeta.content} - ${tabMeta.content}`;

    tabButtons.forEach(tButton => {
        const tabData = tButton.getAttribute('tab-data');

        if (tabData === tabMeta.content) {
            tButton.classList.add("active");
        }

        tButton.addEventListener("click", () => {
            if (!tButton.classList.contains("active")) {
                tabsNav.querySelector(".active")?.classList.remove("active");
                tButton.classList.add("active");

                pageSectionContainer.querySelector(".tab.active")?.classList.remove("active");
                const newActiveTab = pageSectionContainer.querySelector(`#${tabData}`);
                newActiveTab.classList.add("active");

                tabMeta.setAttribute('content', tabData);
                sessionStorage.setItem('tab-meta', tabData);

                document.title = `${pageMeta.content} - ${tabMeta.content}`;
            }

            if (tabsNav.classList.contains("show")) {
                tabsNav.classList.remove("show");
            }
        });
    });
}

// Execute the loadTab function once the DOM is ready
if (document.readyState === 'complete') {
    loadTab();
} else {
    window.addEventListener('load', loadTab);
}

