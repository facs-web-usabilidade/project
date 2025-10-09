const titles = [
    "Hollow Knight: Silksong",
    "Death Stranding",
    "Split Fiction",
    "Stardew Valley",
    "Pokémon Emerald"
];

let index = 0;
const card = document.getElementById("bestseller-card");

function showTitle(i) {
    index = (i + titles.length) % titles.length;
    setTimeout(() => {
        card.textContent = titles[index];
    }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
};

function prevTitle() { 
    showTitle(index - 1);
};

function nextTitle() {
    showTitle(index + 1);
};
