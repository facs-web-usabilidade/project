import { useEffect, useState, useMemo } from "react";
import "../styles/pages/genres.css";
import SmallGameCard from "../components/SmallGameCard";
import GenreFilter from "../components/GenreFilter"; 
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

function normalizeGenre(s) {
    if (!s) return '';
    return s
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

const Genres = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
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

            const gamesWithGenres = await Promise.all(
                gameList.map(async (game) => {
                    try {
                        const categoryRes = await apiService.get(`/categorias/${game.fkCategoria}`, config);
                        const categoriaNome = categoryRes.data.nome;

                        return {
                            ...game,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: categoriaNome,
                            normalizedGenre: normalizeGenre(categoriaNome),
                        };
                    } catch (err) {
                        console.error(`Erro ao carregar a categoria: ${game.fkCategoria}`);
                        return {
                            ...game,
                            img: "../images/card_205w_305h.png",
                            altTxt: "imagem de jogo",
                            genre: "Indefinido",
                            normalizedGenre: "indefinido",
                        };
                    }
                })
            );

            setGames(gamesWithGenres);
        } catch (err) {
            console.error("Erro ao carregar jogos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const gamesByGenre = useMemo(() => {
        if (loading || games.length === 0) return {};

        return games.reduce((acc, game) => {
            const key = game.normalizedGenre;
            if (!acc[key]) {
                acc[key] = {
                    name: game.genre,
                    list: [],
                };
            }
            acc[key].list.push(game);
            return acc;
        }, {});
    }, [games, loading]);

    const genreKeys = Object.keys(gamesByGenre).sort();

    // Ativar o botão do genero 
    const [activeGenre, setActiveGenre] = useState(null);


    // Função de scroll
   function scrollToGenre(genreKey) {
    setActiveGenre(genreKey); 

    const element = document.getElementById(genreKey);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}


    function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


    return (
        <main className="content">
            {loading ? (
                <p className="loading-text">Carregando gêneros...</p>
            ) : (
                <section className="genres-section">

                    {/* NOVO COMPONENTE DE FILTRO */}
                    <GenreFilter 
                        genreKeys={genreKeys} 
                        gamesByGenre={gamesByGenre} 
                        onScrollToGenre={scrollToGenre}
                        activeGenre={activeGenre}
                    />

                    {genreKeys.map((genreKey) => ( 
    <section key={genreKey} className="genre-listing">

        <div className="same-line" id={genreKey}>
            <h3>{gamesByGenre[genreKey].name}</h3>

            {/* Botão de voltar ao topo */}
            <button className="back-top-btn" onClick={scrollToTop}>
                Subir
            </button>
        </div>

        <section className="cards">
            {gamesByGenre[genreKey].list.map((game) => (
                <SmallGameCard
                    key={game.id}
                    classId="card"
                    game={game}
                    imgSrc={game.img}
                    altTxt={game.altTxt}
                    path="/games/gameInfo/"
                    usarGameId={true}
                />
            ))}
        </section>
        

        <hr className="separator" />
    </section>
))}

                </section>
            )}
        </main>
    );
};

export default Genres;
