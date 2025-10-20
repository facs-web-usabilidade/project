const sidebar = document.querySelector(".sidebar");
const hamburger = document.getElementById("hamburger_menu_icon");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});