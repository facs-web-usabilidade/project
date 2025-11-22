import { useEffect } from "react";
import "../styles/pages/myGames.css";

const MyGames = () => {
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
        fetch("http://localhost:3000/api/v1/usuarios/my/games", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
            const container = document.getElementById("game-list");

            data.forEach((dado) => {
                const link = document.createElement("a");
                link.classList.add("card-link");
                link.href = `/myGames/myGameInfo/${dado.jogo.id}`;

                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement("img");
                img.src = "../images/card_205w_305h.png";
                card.appendChild(img);

                const title = document.createElement("p");
                title.classList.add("game-title-img");
                title.textContent = dado.jogo.nome;

                link.appendChild(card);
                link.appendChild(title);

                container.appendChild(link);
            });

            createCards();
            })
            .catch((err) => console.error("erro ao carregar lista de jogos:", err));
        }
    return (
        <main className="content">
            <section className="games">
                <h3>Meus Jogos</h3>
                <section className="cards" id="game-list"></section>
            </section>
        </main>
    );
};

export default MyGames;
