import { useEffect } from "react";
import "../styles/pages/games.css";

const Games = () => {
    useEffect(() => {
        function normalizeGenre(s) {
            if (!s) return '';
            return s
                .toString()
                .normalize('NFD')                 // separa letras + acentos
                .replace(/[\u0300-\u036f]/g, '')  // remove acentos
                .toLowerCase()
                .trim();
            }

            const genreButtons = document.querySelectorAll('.genre-btn');
            const gameCards = document.querySelectorAll('#game-list .card-link');

            genreButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // atualiza visual dos botões
                    genreButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const selected = normalizeGenre(button.dataset.genre); 

                    gameCards.forEach(card => {
                    const cardGenre = normalizeGenre(card.getElementsByClassName('card')[0].dataset.genre || '');
                    
                    if (selected === 'all' || selected === '' ) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = (cardGenre === selected) ? 'block' : 'none';
                    }
                    });

                    // opcional: se quiser rolar ao topo da lista ao filtrar
                    // const list = document.getElementById('game-list');
                    // if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });

            // Games.js aqui:
            const games = [
                { title: "Hollow Knight: Silksong", genre: "Ação", href: "../gameInfo/gameInfo.html" },
                { title: "Death Stranding", genre: "Ação" },
                { title: "Split Fiction", genre: "Ação" },
                { title: "Stardew Valley", genre: "Ação" },
                { title: "Pokémon Emerald", genre: "RPG" },
                { title: "The Legend of Zelda: Tears of the Kingdom", genre: "Ação" },
                { title: "Celeste", genre: "Estratégia" },
                { title: "Undertale", genre: "Ação" },
                { title: "Dark Souls III", genre: "RPG" },
                { title: "Elden Ring", genre: "Estratégia" },
                { title: "The Witcher 3: Wild Hunt", genre: "Ação" },
                { title: "Cyberpunk 2077", genre: "Ação" },
                { title: "Red Dead Redemption 2", genre: "RPG" },
                { title: "God of War: Ragnarök", genre: "RPG" },
                { title: "Resident Evil 4 Remake", genre: "Ação" },
                { title: "Super Mario Odyssey", genre: "Corrida" },
                { title: "Metroid Dread", genre: "RPG" },
                { title: "Cuphead", genre: "Ação" },
                { title: "Ori and the Will of the Wisps", genre: "RPG" },
                { title: "Dead Cells", genre: "Estratégia" },
                { title: "Hades", genre: "Ação" },
                { title: "Slay the Spire", genre: "Ação" },
                { title: "Terraria", genre: "Estratégia" },
                { title: "Minecraft", genre: "Ação" },
                { title: "No Man’s Sky", genre: "Ação" },
                { title: "Horizon Forbidden West", genre: "Ação" },
                { title: "Final Fantasy VII Remake", genre: "RPG" },
                { title: "Persona 5 Royal", genre: "RPG" },
                { title: "Baldur’s Gate 3", genre: "RPG" },
                { title: "Starfield", genre: "RPG" }
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
    }, []);

    return (
        <main className="content">
        <section className="games-section">
            <div className="genre-row">
                <h3>Gêneros</h3>

                <section className="genre-filters">
                    <button className="genre-btn genre-btn-all" data-genre="all">Todos</button>
                    <button className="genre-btn" data-genre="acao">Ação</button>
                    <button className="genre-btn" data-genre="rpg">RPG</button>
                    <button className="genre-btn" data-genre="corrida">Corrida</button>
                    <button className="genre-btn" data-genre="indie">Indie</button>
                    <button className="genre-btn" data-genre="estrategia">Estratégia</button>
                    <a className="genre-btn genre-btn-more" href="/genres">Mais</a>
                </section>
            </div>

            <section className="games">
                <h3>Lista de Jogos</h3>
                <section className="cards" id="game-list"></section>
            </section>
        </section>
        </main>
    );
};

export default Games;
