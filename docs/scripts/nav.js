let toggle = document.querySelector('.toggle-menu');
let nav = document.querySelector('nav');
toggle.addEventListener("click", () => {
    nav.classList.toggle('show');
    toggle.classList.toggle('active');
})

// ===================================
let left_nav_toggle = document.querySelector('.nav-toggle');
let leftNavUl = document.querySelector('.left-nav-ul');

left_nav_toggle.addEventListener("click", () => {
    leftNavUl.classList.toggle('show');
    left_nav_toggle.classList.toggle('active');
})

// ==================================
let page_top = document.querySelector('.top-page');

window.onscroll = function () {
    this.scrollY >= 1000 ? page_top.classList.add("show") : page_top.classList.remove("show");
}

page_top.onclick = function() {
    window.scrollTo({
        top: 0,
        // behavior: "smooth",
    });
}
