import { useEffect } from "react";
import "../styles/pages/games.css";
import Layout from "../components/Layout";

const Games = () => {
    useEffect(() => {
        fetchGames();
    }, []);

    function getGameCards() {
        return document.querySelectorAll('#game-list .card-link');
    }

    function createCards() {
        const genreButtons = document.querySelectorAll('.genre-btn');

        genreButtons.forEach(button => {
            button.addEventListener('click', () => {
                // atualiza visual dos botões
                genreButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const selected = normalizeGenre(button.dataset.genre);

                const gameCards = getGameCards();

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
    }

    function normalizeGenre(s) {
        if (!s) return '';
        return s
            .toString()
            .normalize('NFD')                 // separa letras + acentos
            .replace(/[\u0300-\u036f]/g, '')  // remove acentos
            .toLowerCase()
            .trim();
    }

    function fetchGames() {
        fetch("http://localhost:3000/api/v1/jogos") // http://localhost:3000/api/v1/jogos com token, fiz usando public
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('game-list');

            data.forEach(game => {
                const link = document.createElement('a');
                link.classList.add('card-link');
                link.href = `/games/gameInfo/${game.id}`;

                const card = document.createElement('div');
                card.classList.add('card');

                // setar categoria dos jogos
                fetch(`http://localhost:3000/api/v1/categorias/${game.fkCategoria}`)
                    .then(res => res.json())
                    .then(categoria => {
                    card.dataset.genre = normalizeGenre(categoria.nome) || "Indefinido";
                });

                const img = document.createElement('img');
                img.src = "../images/card_205w_305h.png"; 
                card.appendChild(img);

                const title = document.createElement('p');
                title.classList.add('game-title-img');
                title.textContent = game.nome;

                link.appendChild(card);
                link.appendChild(title);

                console.log("API categoria:", game.categoria, "→ normalized:", normalizeGenre(game.categoria));

                container.appendChild(link);
            });
            createCards();
        })
        .catch(err => console.error("erro ao carregar lista de jogos:", err));
    }

    return (
        <Layout>
            <main className="content">
                <section className="games-section">
                    <div className="genre-row">
                        <h3>Gêneros</h3>

                        <section className="genre-filters">
                            <button className="genre-btn genre-btn-all" data-genre="all">Todos</button>
                            <button className="genre-btn" data-genre="acao">Ação</button>
                            <button className="genre-btn" data-genre="rpg">RPG</button>
                            <button className="genre-btn" data-genre="aventura">Aventura</button>
                            <button className="genre-btn" data-genre="puzzle">Puzzle</button>
                            <button className="genre-btn" data-genre="simulacao">Simulação</button>
                            <a className="genre-btn genre-btn-more" href="/genres">Mais</a>
                        </section>
                    </div>

                    <section className="games">
                        <h3>Lista de Jogos</h3>
                        <section className="cards" id="game-list"></section>
                    </section>
                </section>
            </main>
        </Layout>
    );
};

export default Games;
