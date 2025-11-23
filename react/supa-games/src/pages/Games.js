import { useEffect, useState } from "react";
import "../styles/pages/games.css";
import SmallGameCard from "../components/SmallGameCard";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const Games = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState("all"); // TODO: adicionar o filtro sem usar DOM 
    
    useEffect(() => {
        fetchGames();
    }, []);

    // useEffect(() => {
    //     if (!loading) {
    //         createCards();
    //     }
    // }, [loading, games]);

    function normalizeGenre(s) {
        if (!s) return '';
        return s
            .toString()
            .normalize('NFD')                 // separa letras + acentos
            .replace(/[\u0300-\u036f]/g, '')  // remove acentos
            .toLowerCase()
            .trim();
    }

    function getGameCards() {
        return document.querySelectorAll('#game-list .card-link');
    }

    // function createCards() {
    //     const genreButtons = document.querySelectorAll('.genre-btn');

    //     genreButtons.forEach(button => {
    //         button.addEventListener('click', () => {
    //             // atualiza visual dos botões
    //             genreButtons.forEach(btn => btn.classList.remove('active'));
    //             button.classList.add('active');

    //             const selected = normalizeGenre(button.dataset.genre);

    //             const gameCards = getGameCards();

    //             gameCards.forEach(card => {
    //             const cardGenre = normalizeGenre(card.getElementsByClassName('card')[0].dataset.genre || '');

    //             if (selected === 'all' || selected === '' ) {
    //                 card.style.display = 'block';
    //             } else {
    //                 card.style.display = (cardGenre === selected) ? 'block' : 'none';
    //             }
    //         });

    //         // opcional: se quiser rolar ao topo da lista ao filtrar
    //         // const list = document.getElementById('game-list');
    //         // if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         });
    //     });
    // }

    const filteredGames = games.filter(game => {
        // console.log(game)
        const genre = normalizeGenre(game.genre);

        if (selectedGenre === "all") return true;

        return genre === selectedGenre;
    });

    const fetchGames = async () => { // TODO: transformar em async + usestate + apiservice
        setLoading(true);
        const token = getLocalItem("supa_token");

        if (!token) {
            setGames([]);
            setLoading(false);
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await apiService.get("/jogos", config);
            const gameList = response.data;

            const gamesList = await Promise.all(
                gameList.map(async (game) => {
                    try {
                        const categoryRes = await apiService.get(`/categorias/${game.fkCategoria}`, config);

                        const categoria = normalizeGenre(categoryRes.data.nome);
                        return {
                            ...game,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: categoria
                        };
                    } catch (err) {
                        alert(`Erro ao carregar a categoria :${game.fkCategoria}`);
                        return {
                            ...game,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: "indefinido"
                        };
                    }
                })
            );

            setGames(gamesList);
        } catch (err) {
            console.error("Erro ao carregar jogos:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="content">
            <section className="games-section">
                <div className="genre-row">
                    <h3>Gêneros</h3>
                    {/* filtro hardcoded, irei adicionar dinâmico para os meus jogos, já que lá terá todas as opções possuídas */}
                    <section className="genre-filters">
                        <button className={`genre-btn ${selectedGenre === "all" ? "active" : ""}`} onClick={() => setSelectedGenre("all")}>
                            Todos
                        </button>

                        <button className={`genre-btn ${selectedGenre === "acao" ? "active" : ""}`} onClick={() => setSelectedGenre("acao")}>
                            Ação
                        </button>

                        <button className={`genre-btn ${selectedGenre === "rpg" ? "active" : ""}`} onClick={() => setSelectedGenre("rpg")}>
                            RPG
                        </button>

                        <button className={`genre-btn ${selectedGenre === "aventura" ? "active" : ""}`} onClick={() => setSelectedGenre("aventura")}>
                            Aventura
                        </button>

                        <button className={`genre-btn ${selectedGenre === "puzzle" ? "active" : ""}`} onClick={() => setSelectedGenre("puzzle")}>
                            Puzzle
                        </button>

                        <button className={`genre-btn ${selectedGenre === "simulacao" ? "active" : ""}`} onClick={() => setSelectedGenre("simulacao")}>
                            Simulação
                        </button>
                        <a className="genre-btn genre-btn-more" href="/genres">Mais</a>
                    </section>
                </div>

                <section className="games">
                    <h3>Lista de Jogos</h3>

                    {/* <section className="cards" id="game-list"></section> */}
                    
                    <section className="cards" id="game-list">
                        {loading ? (
                            <p className="game-list-cards-loading">Carregando...</p>
                        ) : (
                            <>
                                {filteredGames.map((game) => (
                                    <SmallGameCard
                                        key={game.id}
                                        classId="card"
                                        game={game}
                                        imgSrc="../images/card_205w_305h.png"
                                        altTxt="imagem de jogo"
                                        path="/games/gameInfo/"
                                    />
                                ))}

                                {/* {games.length === 0 && (
                                    <p className="game-list-cards-no-games-found">Nenhum jogo encontrado.</p>
                                )} */}

                                {filteredGames.length === 0 && (
                                    <p className="game-list-cards-no-games-found">
                                        Nenhum jogo encontrado.
                                    </p>
                                )}
                            </>
                        )}
                    </section>
                </section>
            </section>
        </main>
    );
};

export default Games;
