page_meta = document.querySelector('meta[name=page]');
tab_meta = document.querySelector('meta[name=tab]');

// set the active page button to active
let pages_nav = document.querySelector('nav');
let pages_buttons = pages_nav.querySelectorAll('a');
pages_buttons.forEach(p_button => {
    if (p_button.getAttribute('page-data') === page_meta.content) {
        p_button.classList.add("active");
    }
});
// =============================================
// load the last opened tab
// set the active tab button to active
let page_section_container = document.querySelector(".page-section");
let tabs_nav = document.querySelector(".left-nav-ul");

let tab_buttons = tabs_nav.querySelectorAll("button");

function loadtab() {
    at = page_section_container.querySelector(`#${tab_meta.content}`);
    at.classList.add("active");

    const saved_tab = sessionStorage.getItem('tab-meta');
    if (saved_tab) {
        tab_meta.setAttribute('content', saved_tab);
        tab_meta = document.querySelector('meta[name=tab]');

        let ot = page_section_container.querySelector(".active");
        ot.classList.remove("active");
        
        let at = page_section_container.querySelector(`#${saved_tab}`);
        at.classList.add("active");
    }

    tab_buttons.forEach(t_button => {
        let b_tabdata = t_button.getAttribute('tab-data');

        if (t_button.getAttribute('tab-data') === tab_meta.content) {
            t_button.classList.add("active");
        }

        t_button.addEventListener("click", () => {
            if (t_button.classList.contains("active")) {
                return;
            } else {
                let ob = tabs_nav.querySelector(".active");
                ob.classList.remove("active");

                t_button.classList.add("active");

                let at = page_section_container.querySelector(`#${b_tabdata}`);
                let ot = page_section_container.querySelector(".active");

                at.classList.add("active");
                ot.classList.remove("active");

                tab_meta.setAttribute('content', b_tabdata);
                sessionStorage.setItem('tab-meta', b_tabdata);
            }
        });
    });
}

window.onload = loadtab;
// =============================================