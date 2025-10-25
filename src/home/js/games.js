const games = [
    { title: "Hollow Knight: Silksong", genre: "Ação", href: "../gameInfo/gameInfo.html" },
    { title: "Death Stranding", genre: "Ação" },
    { title: "Split Fiction", genre: "Ação" },
    { title: "Stardew Valley", genre: "Ação" },
    { title: "Pokémon Emerald", genre: "RPG" },
];

const container = document.getElementById('game-list');

games.forEach(game => {
    const link = document.createElement('a');
    link.classList.add('card-link');
    link.href = game.href || '#';

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.genre = game.genre;

    const img = document.createElement('img');
    img.src = game.img || "../components/img/card_205w_305h.png";
    card.appendChild(img);

    const title = document.createElement('p');
    title.classList.add('game-title-img');
    title.textContent = game.title;

    link.appendChild(card);
    link.appendChild(title);

    container.appendChild(link);
});