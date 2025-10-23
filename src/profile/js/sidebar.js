const sidebar = document.querySelector(".sidebar");
const hamburger = document.getElementById("hamburger_menu_icon");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});

// // Pode ser interessante:
// // Fechar a sidebar ao clicar fora dos links
// document.addEventListener("click", (e) => {
//     if (!hamburger.contains(e.target)) {
//         sidebar.classList.toggle("hidden");
//     }
// });