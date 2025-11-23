import { useEffect, useState } from "react";
import "../styles/pages/myGames.css";
import SmallGameCard from "../components/SmallGameCard";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const MyGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState("all"); // TODO: adicionar o filtro sem usar DOM 
    
    useEffect(() => {
        getGames();
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

    // function getGameCards() {
    //     return document.querySelectorAll('#game-list .card-link');
    // }

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

    // const getCategoria = async (fkCat, config) => {
    //     const res = await apiService.get(`/categorias/${fkCat}`, config);
    //     return res.data;
    // };

    // const filteredGames = async () => games.filter(game => {
    //     setLoading(true);
    //     const token = getLocalItem("supa_token");

    //     if (!token) {
    //         setGames([]);
    //         setLoading(false);
    //         return;
    //     }

    //     const config = { headers: { Authorization: `Bearer ${token}` } };
    //     // console.log(game.jogo.fkCategoria)
    //     const genre = normalizeGenre(getCategoria(game.jogo.fkCategoria, config));

    //     if (selectedGenre === "all") return true;

    //     return genre === selectedGenre;
    // });

    const filteredGames = games.filter(game => {
        if (selectedGenre === "all") return true;
        return game.genre === selectedGenre;
    });

    const getGames = async () => { // TODO: transformar em async + usestate + apiservice
        setLoading(true);
        const token = getLocalItem("supa_token");

        if (!token) {
            setGames([]);
            setLoading(false);
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const response = await apiService.get("/usuarios/my/games", config);
            const myGameList = response.data;
            console.log(myGameList)

            const myGamesList = await Promise.all(
                myGameList.map(async ({ jogo }) => {
                    try {
                        const categoryRes = await apiService.get(`/categorias/${jogo.fkCategoria}`, config);

                        const categoriaNoFormat = categoryRes.data.nome;
                        const categoria = normalizeGenre(categoryRes.data.nome);
                        // console.log(categoria)
                        return {
                            ...jogo,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: categoria,
                            genreNoFormat: categoriaNoFormat,
                        };
                    } catch (err) {
                        alert(`Erro ao carregar a categoria :${jogo.fkCategoria}`);
                        return {
                            ...jogo,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: "indefinido",
                            genreNoFormat: "Indefinido"
                        };
                    }
                })
            );

            setGames(myGamesList);
        } catch (err) {
            console.error("Erro ao carregar jogos:", err);
        } finally {
            setLoading(false);
        }
    };

    // const genres = ["todos", ...new Array(games.map(g => g.genre))]; // test
    const genres = ["all", ...new Set(games.map(g => g.genre))];

    const genreNoFormatSet = {};
    games.forEach(g => {
        genreNoFormatSet[g.genre] = g.genreNoFormat;
    });  

    return (
        <main className="content">
            <section className="games-section">
                <div className="genre-row">
                    <h3>Gêneros</h3>

                    <section className="genre-filters">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
                                onClick={() => setSelectedGenre(genre)}
                            >
                                {genre === "all"
                                    ? "Todos"
                                    : genreNoFormatSet[genre].charAt(0).toUpperCase() + genreNoFormatSet[genre].slice(1)}
                            </button>
                        ))}

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
                                {filteredGames.map((game, index) => {
                                    console.log("INDEX:", index, "GAME:", game.id);
                                    return (
                                        <SmallGameCard
                                        key={index}
                                        classId="card"
                                        game={game}
                                        imgSrc="../images/card_205w_305h.png"
                                        altTxt="imagem de jogo"
                                        path={`/myGames/myGameInfo/${index}`}   // usando index pq se usar game.id as vezes buga, caso o usuário tenha o mesmo jogo 2x...
                                        usarGameId={false}
                                        />
                                    );
                                    })}

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

export default MyGames;
