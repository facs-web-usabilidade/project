const profileImage = document.getElementById("profile-image");
const dropdown = document.querySelector(".profile-dropdown");
const themeToggle = document.getElementById("theme-toggle");
const zoomRange = document.getElementById("zoom-range");
const fontRange = document.getElementById("font-range");
const menuIcon = document.getElementById('hamburger_menu_icon').getElementsByTagName('img')[0];

profileImage.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("show");
});

// // Pode ser interessante:
// // Fechar o dropdown ao clicar fora dos links
// document.addEventListener("click", (e) => {
//     if (!dropdown.contains(e.target)) {
//         dropdown.classList.remove("show");
//     }
// });

themeToggle.addEventListener("change", () => {
    const isLight = themeToggle.checked;
    document.body.classList.toggle("light-theme", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

const allElements = document.querySelectorAll("body *");
allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    el.dataset.baseFontSize = parseFloat(style.fontSize);
});

zoomRange.addEventListener("input", () => {
    const zoomValue = zoomRange.value;

    allElements.forEach(el => {
        const base = parseFloat(el.dataset.baseFontSize);
        el.style.fontSize = `${base * (zoomValue / 100)}px`;
    });

    // tudo testado na mão, talvez não tão preciso
    const homeLink = document.getElementById('website-home-link');
    if (homeLink) {
        if(zoomValue < 100) {
            homeLink.style.top = `${(zoomValue/20)}px`;
            homeLink.style.left = `${(zoomValue/1.5)}px`;
        } else {
            homeLink.style.top = `-${(zoomValue/20)}px`;
            homeLink.style.left = `${(zoomValue/1.5)}px`;
        }
    }

    if (menuIcon) {
        const scale = zoomValue / 100;
        menuIcon.style.width = `${30 * scale}px`;
        menuIcon.style.height = `${30 * scale}px`;
    }

    localStorage.setItem("zoom", zoomValue);
});

// fontRange.addEventListener("input", () => {
//     const fontValue = fontRange.value;
//     document.body.style.fontSize = `${fontValue}%`;
// });

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    themeToggle.checked = true;
    document.body.classList.add("light-theme");
} else {
    themeToggle.checked = false;
    document.body.classList.remove("light-theme");
}

const savedZoom = localStorage.getItem("zoom");
if (savedZoom) {
    zoomRange.value = savedZoom;
    
    allElements.forEach(el => {
        const base = parseFloat(el.dataset.baseFontSize);
        el.style.fontSize = `${base * (savedZoom / 100)}px`;
    });

    if (menuIcon) {
        const scale = savedZoom / 100;
        menuIcon.style.width = `${30 * scale}px`;
        menuIcon.style.height = `${30 * scale}px`;
    }

    // tudo testado na mão, talvez não tão preciso
    const homeLink = document.getElementById('website-home-link');
    if (homeLink) {
        if(savedZoom < 100) {
            homeLink.style.top = `${(savedZoom/20)}px`;
            homeLink.style.left = `${(savedZoom/1.5)}px`;
        } else {
            homeLink.style.top = `-${(savedZoom/20)}px`;
            homeLink.style.left = `${(savedZoom/1.5)}px`;
        }
    }
}