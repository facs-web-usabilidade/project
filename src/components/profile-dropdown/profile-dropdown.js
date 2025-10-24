const profileImage = document.getElementById("profile-image");
const dropdown = document.querySelector(".profile-dropdown");

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