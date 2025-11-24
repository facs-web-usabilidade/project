// src/components/MediumCard.jsx
import { useEffect, useState } from "react";
import apiService from "../services/apiService";

function MediumGameCard({ game }) {
    const [genre, setGenre] = useState("Indefinido");

    useEffect(() => {
        apiService.get(`/categorias/${game.fkCategoria}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
            }
        })
            .then((res) => {
                const categoria = res.data;
                setGenre(normalizeGenre(categoria.nome));
            });
    }, [game.fkCategoria]);

    return (
        <>
            <a
                className="card-link"
                href={`/games/gameInfo/${game.id}`}
                data-genre={genre}
            >
                <div className="card">
                    <img src="../images/card_205w_305h.png" alt={game.nome} />
                </div>
            </a>

            <p className="game-title-img">{game.nome}</p>
        </>
    );
}

function normalizeGenre(s) {
        if (!s) return 'Indefinido';
        return s
            .toString()
            .normalize('NFD')                 // separa letras + acentos
            .replace(/[\u0300-\u036f]/g, '')  // remove acentos
            .toLowerCase()
            .trim();
    }

export default MediumGameCard;