let darkmode = localStorage.getItem('darkmode');

const enableDarkmode = () => {
    document.documentElement.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.documentElement.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if (darkmode === "active") enableDarkmode();

const checkInterval2 = setInterval(() => {
    if (inserted) {
        const themeswitch = document.getElementById('theme-switch');
        themeswitch.addEventListener("click", () => {
            darkmode = localStorage.getItem('darkmode');
            darkmode !== "active" ? enableDarkmode() : disableDarkmode();
        });
        clearInterval(checkInterval2); // Stop the interval once the scripts are inserted
    }
}, 100);