let toggle = document.querySelector('.toggle-menu');
let nav = document.querySelector('nav');
toggle.addEventListener("click", () => {
    nav.classList.toggle('show');
    toggle.classList.toggle('active');
})
