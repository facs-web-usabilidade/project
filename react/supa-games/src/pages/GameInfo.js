import { useEffect, useState } from "react";
import "../styles/pages/gameInfo.css";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const GameInfo = () => {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [empresa, setEmpresa] = useState("");
    const [categoria, setCategoria] = useState("");
    const [avaliacaoMedia, setAvaliacaoMedia] = useState(null);
    const [comments, setComments] = useState([]);

    const [rating, setRating] = useState(0);
    const [commentText, setCommentText] = useState("");
    
    const token = getLocalItem("supa_token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        if (id){
            loadGame();
            loadComments();
        }
    }, []);

    // function returnEmpresa(id) {
    // fetch(`http://localhost:3000/api/v1/empresas/${id}`) // http://localhost:3000/api/v1/empresas
    //     .then(res => res.json())
    //     .then(empresa => {
    //         return empresa.nome;
    //     })
    //     .catch(err => console.error("Erro ao carregar empresa:", err));
    // }

    // function returnCategoria(id) {
    // fetch(`http://localhost:3000/api/v1/categorias/${id}`)
    //     .then(res => res.json())
    //     .then(categoria => {
    //         return categoria.nome;
    //     })
    //     .catch(err => console.error("Erro ao carregar empresa:", err));
    // }

    async function loadGame() {
        try {
            const res = await apiService.get(`/jogos/${id}`, config);
            const jogo = res.data;

            setGame(jogo);

            const [empresaRes, categoriaRes, mediaRes] = await Promise.all([
                apiService.get(`/empresas/${jogo.fkEmpresa}`, config),
                apiService.get(`/categorias/${jogo.fkCategoria}`, config),
                apiService.get(`/avaliacoes/media/${id}`, config).catch(() => ({ data: { media: null } }))
            ]);

            setEmpresa(empresaRes.data?.nome || "");
            setCategoria(categoriaRes.data?.nome || "");
            setAvaliacaoMedia(mediaRes.data?.media || null);

        } catch (err) {
            console.error("Erro ao carregar jogo:", err);
        }
    }

    async function loadComments() {
        try {
            const res = await apiService.get(`/avaliacoes/media/${id}`, config);
            const list = res.data?.avaliacoes || [];

            // console.log(list)
            const commentsList = await Promise.all(
                list.map(async (comm) => {
                    try {
                        const userRes = await apiService.get(`/usuarios/${comm.fkUsuario}`, config);
                        return { ...comm, username: userRes.data?.nome || "Usuário" };
                    } catch {
                        return { ...comm, username: "Usuário desconhecido" };
                    }
                })
            );

            setComments(commentsList);
            // console.log(commentsList);
        } catch {
            setComments([]);
        }
    }

    function formatCommentDate(date) {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    // function fetchUsername(userId) {
    //     return fetch(`http://localhost:3000/api/v1/usuarios/${userId}`, {
    //         headers: {
    //             "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => data.nome)
    //     .catch(() => "Usuário desconhecido");
    // }

    async function handleAddToCart() {
        try {
            const res = await apiService.post(`/carrinho/add`, { jogoId: id }, config);
            alert(res.data?.message || "Adicionado ao carrinho");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert("Jogo já adicionado ao carrinho.");
                return;
            }
            alert("Erro ao adicionar ao carrinho");
        }
    }

    async function handleAddToWishlist() {
        try {
            const res = await apiService.post(`/lista-desejo/`, { jogoId: id }, config);
            alert(res.data?.message || "Adicionado à lista de desejos");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert("Jogo já adicionado à lista de desejos.");
                return;
            }
            alert("Erro ao adicionar à lista de desejos");
        }
    }

    async function sendRating() {
        if (commentText.trim() === "") {
            alert("Escreva um comentário!");
            return;
        }

        try {
            const res = await apiService.post(`/avaliacoes/`,{ nota: rating, jogoId: id, comentario: commentText}, config);

            alert(res.data?.message || "Avaliação enviada");
            loadComments();

        } catch (err) {
            if (err.response && err.response.status === 400) {
                alert("Avaliação já enviada desse jogo.");
                return;
            }
            alert("Erro ao enviar avaliação.");
        }
    }

    // caso não consiga achar o jogo
    if (!game) {
        return <main className="content-grid">
            <div className="game-details-container">
                <h2>Carregando...</h2>
            </div>
        </main>;
    }

    return (
        <main className="content-grid">
            <div className="game-details-container">

            <section className="game-info">
                <div className="info-top">
                <div className="game-image">
                    <img src="../../images/card_205w_305h.png" alt="Capa do Jogo"/></div>
                <div className="game-details">
                    <h2>{game.nome}</h2>

                    <p>
                        <strong>Preço: </strong> 
                        <span className="game-price">
                            {game.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </p>
                    <p>
                        <strong>Avaliação: </strong> 
                        <span className="game-nota">
                            {avaliacaoMedia ? `${avaliacaoMedia} ★` : "Sem avaliações"}
                        </span>
                    </p>
                    <p><strong>Desenvolvedora: </strong> <span className="game-dev">{empresa}</span></p>
                    <p><strong>Gênero: </strong> <span className="game-genero">{categoria}</span></p>
                    <p><strong>Ano: </strong> <span className="game-ano">{game.ano}</span></p>

                    <fieldset>
                        <legend><h3>Sobre este jogo:</h3></legend>
                        <p>{game.descricao.replace('"', " ").slice(0, -1)}</p>
                    </fieldset>
                    <div id="game-info-buttons">
                        <button onClick={handleAddToCart} className="cart-btn">Adicionar ao carrinho</button>
                        <button onClick={handleAddToWishlist} className="wishlist-btn">+ Lista de desejos</button>
                    </div>
                </div>
            </div>
            </section>

            <aside className="comments-section">
                    <h3>Comentários:</h3>

                    <div className="comment-box new-comment">
                        <textarea className="comment-text" placeholder="Digite seu comentário" value={commentText}onChange={e => setCommentText(e.target.value)} />

                        <div className="rating-row">
                            <label>
                                Nota: <span>{rating}</span> ★
                            </label>

                            <input className="rating-range" type="range" min="0" max="5" step="0.5" value={rating} onChange={e => setRating(e.target.value)}/>
                        </div>

                        <button className="submit-comment" onClick={sendRating}>Enviar</button>
                    </div>

                    <div className="comment-list">
                        {comments.length === 0 ? (
                            <p className="no-comments">Sem comentários. Seja o primeiro a avaliar o jogo!</p>
                        ) : (
                            comments.map((comm, key) => (
                                <div className="comment-box" key={key}>
                                    <img className="comment-avatar" src="../../images/profile_icon.png" />
                                    <p>
                                        <span className="comment-lines">Usuário: </span>
                                        <span className="comment-lines2">{comm.username}</span><br />

                                        <span className="comment-lines">Nota: </span>
                                        <span className="comment-lines2">{comm.nota} ★</span><br />

                                        <span className="comment-lines">Comentário: </span>
                                        <span className="comment-lines2">{comm.comentario}</span><br />

                                        <span className="comment-lines">Data: </span>
                                        <span className="comment-lines2">{formatCommentDate(comm.data)}</span>
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </aside>

            </div>
        </main>
    );
};

export default GameInfo;
