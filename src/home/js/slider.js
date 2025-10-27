const bestsellers = [
    "Hollow Knight: Silksong",
    "Death Stranding",
    "Split Fiction",
    "Stardew Valley",
    "Pokémon Emerald"
];

const toprated = [
    "Stardew Valley",
    "Death Stranding",
    "Split Fiction",
    "Hollow Knight: Silksong",
    "Pokémon Emerald"
];

let index1 = 0,  index2 = 0;
const card_bestsellers = document.getElementById("card-slider-bestsellers");
const card_toprated = document.getElementById("card-slider-toprated");

function showTitle1(i) {
    index1 = (i + bestsellers.length) % bestsellers.length;
    setTimeout(() => {
        card_bestsellers.textContent = bestsellers[index1];
    }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
};

function showTitle2(i) {
    index2 = (i + toprated.length) % toprated.length;
    setTimeout(() => {
        card_toprated.textContent = toprated[index2];
    }, 200); // delay para mudar o content do card, apenas para parecer mais suave - CSS também tem transition ease
};

function prevTitle1() { 
    showTitle1(index1 - 1);
};

function nextTitle1() {
    showTitle1(index1 + 1);
};


function prevTitle2() { 
    showTitle2(index2 - 1);
};

function nextTitle2() {
    showTitle2(index2 + 1);
};
