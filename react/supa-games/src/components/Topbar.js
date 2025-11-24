import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";
import "../styles/topbar.css";

const Topbar = () => {
    const [query, setQuery] = useState("");
    const [games, setGames] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchList();
    }, []);

    const lastFetch = useRef(0);
    const TIME_LIMIT = 1 * 60000;

    async function fetchList() {
        try {
            const token = getLocalItem("supa_token");

            const response = await apiService.get("/jogos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setGames(response.data);
            lastFetch.current = Date.now();
        } catch (err) {
            console.error("Error fetching game list:", err);
        }
    }

    const handleInput = async (text) => {
        console.log("start")
        setQuery(text);

        const now = Date.now();

        if (now - lastFetch.current > TIME_LIMIT) {
            await fetchList();
        }

        if (text.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filtered = games
            .filter((game) =>
                game.nome.toLowerCase().includes(text.toLowerCase())
            )
            .slice(0, 5);

        setSearchResults(filtered);
        console.log(filtered)
    };

    return (
        <header className="topbar">
            <div className="search-box">
                <input type="text" placeholder="Digite aqui para buscar um jogo" value={query} onChange={(e) => handleInput(e.target.value)} />
                {searchResults.length > 0 && (
                    <ul className="suggestion-box">
                        {searchResults.map((result) => (
                            <li className="suggestion-list" key={result.id}>
                                <Link
                                    className="suggestion-text"
                                    to={`/games/gameInfo/${result.id}`}
                                    onClick={() => setSearchResults([])}
                                >
                                    {result.nome}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Topbar;