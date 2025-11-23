import { useEffect } from "react";
import "../styles/pages/gameInfo.css";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

const GameInfo = () => {
    const { id } = useParams();
    
    useEffect(() => {
        if (id){
            fetchGameInfo(id);
            fetchComments(id);
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

    function fetchGameInfo(gameId) {
        apiService.get(`/jogos/${gameId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
            }
        })
        .then(res => {
            const game = res.data;
            document.querySelector(".game-preco").textContent = game.preco;
            document.querySelector(".game-ano").textContent = game.ano;
            document.querySelector(".game-description").textContent = (game.descricao).replace('"', ' ').slice(0, -1); // remover aspas
            document.querySelector(".game-details h2").textContent = game.nome;

            apiService.get(`/empresas/${game.fkEmpresa}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
                }
            })
                .then(res => {
                const empresa = res.data;
                document.querySelector(".game-dev").textContent = empresa.nome;
            });

            apiService.get(`/categorias/${game.fkCategoria}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
                }
            })
                .then(res => {
                const categoria = res.data;
                document.querySelector(".game-genero").textContent = categoria.nome;
            });

            apiService.get(`/avaliacoes/media/${gameId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
                }
            })
            .then(res => {
                if (res.status === 204) return null;
                return res.data;
            })
            .then(avaliacao => {
                const el = document.querySelector(".game-nota");

                if (!avaliacao || !avaliacao.media) {
                    el.textContent = "Sem avaliações";
                } else {
                    el.textContent = avaliacao.media + " ★";
                }
            })
            .catch(err => console.error("Erro ao buscar avaliação:", err));
        })
        .catch(err => console.error("Erro ao carregar jogo:", err));
    }

    async function fetchComments(gameId) {
        apiService.get("/avaliacoes", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
            }
        })
            .then(res => {
                if (res.status === 204) return [];
                return res.data;
            })
            .then(list => {
                const comments = list.filter(item => item.fkJogo == gameId);

                const commentBox = document.querySelector(".comment-list");
                commentBox.innerHTML = ""; // limpar o commentbox de inicio

                if (comments.length === 0) {
                    commentBox.innerHTML = "<p className=\"no-comments\">Sem comentários.</p>";
                    return;
                }

                comments.forEach(async item => {
                    const box = document.createElement("div");
                    box.classList.add("comment-box");

                    const avatar = document.createElement("img");
                    avatar.classList.add("comment-avatar");
                    avatar.src = "../../images/profile_icon.png";

                    const p = document.createElement("p");
                    const formattedCommentDate = formatCommentDate(item.data);
                    p.innerHTML = `Usuário Anônimo kkk ${item.nota} ★<br>${item.comentario}<br>Data: ${formattedCommentDate}`;

                    box.appendChild(avatar);
                    box.appendChild(p);

                    commentBox.appendChild(box);

                    const username = await fetchUsername(item.fkUsuario);

                    p.innerHTML = `
                        <span className="comment-lines">Usuário: </span><span className="comment-lines2">${username}</span><br>
                        <span className="comment-lines">Nota: </span><span className="comment-lines2">${item.nota} ★</span> <br>
                        <span className="comment-lines">Comentário: </span><span className="comment-lines2">${item.comentario}</span><br>
                        <span className="comment-lines">Data: </span><span className="comment-lines2">${formattedCommentDate}</span>
                    `;
                });
            })
            .catch(err => {
                console.error(err);
                document.querySelector(".comment-list").innerHTML =
                    "<p>Erro ao carregar comentários.</p>";
            });
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

    function fetchUsername(userId) {
        apiService.get(`/usuarios/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("supa_token")}`
            }
        })
        .then(res => res.data)
        .then(data => data.nome) // adjust if backend returns different field
        .catch(() => "Usuário desconhecido");
    }

    function handleAddToCart(gameId) {
        apiService.post("/carrinho/add",
            { jogoId: gameId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`,
                }
            }
        )
        // .then(res => res.json())
        .then(res => {
            const data = res.data ?? null;
            if (res.status < 200 || res.status >= 300) throw data;
            return data;
        })
        .then(data => {
            alert(`${data.message}\n`) // se já estiver no carrinho, muda a mensagem e retorna bad request...
        })
        .catch(err => {
            console.error("Erro ao adicionar:", err);
            alert(err?.error || "Erro ao adicionar ao carinho, produto pode já estar no carrinho");
        });
    }

    function handleAddToWishlist(gameId) {
        apiService.post("/lista-desejo/",
            { jogoId: gameId },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`,
                }
            }
        )
        // .then(res => res.json())
        .then(res => {
            const data = res.data ?? null;
            if (res.status < 200 || res.status >= 300) throw data;
            return data;
        })
        .then(data => {
            alert(!data.error ? "Jogo adicionado com sucesso" : data.error)
            //alert(`${data?.error !== null ? data.error : "Jogo adicionado com sucesso"}`)
            console.log(data)
        })
        .catch(err => {
            console.error("Erro ao adicionar:", err);
            alert(err?.error || "Erro ao adicionar à lista de desejos");
        });
    }

    function updateRating(value) {
        var selectedRating = parseFloat(value);
        document.getElementById("notaValue").textContent = value;
    }

    function sendRating(gameId) {
        let selectedRating = document.getElementById("ratingRange").value;

        const comment = document.getElementById("comment-text").value.trim();

        if (!comment) {
            alert("Escreva um comentário!");
            return;
        }

        apiService.post("/avaliacoes/",
            {
                nota: selectedRating,
                jogoId: gameId,
                comentario: comment
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("supa_token")}`,
                }
            }
        )
        .then(res => res.data)
        .then(data => {
            alert(data.message);
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao enviar.");
        });
    }

    return (
        <main className="content-grid">
            <div className="game-details-container">

            <section className="game-info">
                <div className="info-top">
                <div className="game-image">
                    <img src="../../images/card_205w_305h.png" alt="Capa do Jogo"/></div>
                <div className="game-details">
                    <h2>Carregando...</h2>
                    <p className="game-price"><strong>Preço: <span className="game-preco">Carregando...</span></strong></p>
                    <p><strong>Avaliação: <span className="game-nota">Carregando...</span></strong></p>
                    <p><strong>Desenvolvedora: <span className="game-dev">Carregando...</span></strong></p>
                    <p><strong>Gênero: <span className="game-genero">Carregando...</span></strong></p>
                    <p><strong>Ano: <span className="game-ano">Carregando... </span></strong></p>
                    <fieldset>
                    <legend>
                        <h3>Sobre este jogo:</h3>
                    </legend>
                    <p className="game-description">
                        Descrição do jogo...
                    </p>
                    </fieldset>
                    <div id="game-info-buttons">
                        <button onClick={() => handleAddToCart(id)} className="cart-btn">
                            Adicionar ao carrinho
                        </button>

                        <button onClick={() => handleAddToWishlist(id)} className="wishlist-btn">
                            + Lista de desejos
                        </button>
                    </div>
                    

                </div>
                </div>
                {/* <div className="game-rating">
                <h3>Avalie</h3>
                <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">☆</span>
                </div>
                </div> */}
            </section>

            <aside className="comments-section">
                <h3>Comentários:</h3>

                <div className="comment-box new-comment">
                    <form id="ratingForm">
                        <textarea id="comment-text" placeholder="Comente aqui:"></textarea>

                        <div className="rating-row">
                            <label htmlFor="notaRange" id="notaRangeLabel">Nota: <span id="notaValue">0</span> ★</label>
                            <input type="range" id="ratingRange" min="0" max="5" step="0.5" defaultValue={0} onChange={(e) => updateRating(e.target.value)} // <input type="range" id="ratingRange" min="0" max="5" step="0.5" value="0" onChange={() => updateRating(this.value)}
                            />
                        </div>

                        <button type="button" id="submit-comment" onClick={() => sendRating(id)}>Enviar</button>
                    </form>
                </div>

                <div className="comment-list">
                {/* <div className="comment-box">
                    <img className="comment-avatar" src="../../images/profile_icon.png"></img>
                    <p>Historia fraca ....</p>
                </div>

                <div className="comment-box">
                    <img className="comment-avatar" src="../../images/profile_icon.png"></img>
                    <p>Historia divertida ....</p>
                </div> */}
                </div>
            </aside>

            </div>
        </main>
    );
};

export default GameInfo;
