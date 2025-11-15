import { useEffect } from "react";
import "../styles/pages/gameInfo.css";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

const GameInfo = () => {
    const { id } = useParams();
    
    useEffect(() => {
        if (id){
            fetchGameInfo(id);
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
    fetch(`http://localhost:3000/api/v1/jogos/${gameId}`)
        .then(res => res.json())
        .then(game => {
            document.querySelector(".game-preco").textContent = game.preco;
            document.querySelector(".game-ano").textContent = game.ano;
            document.querySelector(".game-description").textContent = (game.descricao).replace('"', ' ').slice(0, -1); // remover aspas
            document.querySelector(".game-details h2").textContent = game.nome;

            fetch(`http://localhost:3000/api/v1/empresas/${game.fkEmpresa}`)
                .then(res => res.json())
                .then(empresa => {
                document.querySelector(".game-dev").textContent = empresa.nome;
            });

            fetch(`http://localhost:3000/api/v1/categorias/${game.fkCategoria}`)
                .then(res => res.json())
                .then(categoria => {
                document.querySelector(".game-genero").textContent = categoria.nome;
            });

            //! NOTA DO JOGO, NÃO ESTÁ FUNCIONANDO, ACREDITO QUE POR ERRO DO BACKEND
            // fetch(`http://localhost:3000/api/v1/avaliacoes/media/${gameId}`)
            //     .then(res => res.json())
            //     .then(avaliacao => {
            //     document.querySelector(".game-nota").textContent = avaliacao.nota;
            // });
        })
        .catch(err => console.error("Erro ao carregar jogo:", err));
    }

    return (
        <Layout>
            <main className="content-grid">
                <div className="game-details-container">

                <section className="game-info">
                    <div className="info-top">
                    <div className="game-image">
                        <img src="../../images/card_205w_305h.png" alt="Capa do Jogo"/></div>
                    <div className="game-details">
                        <h2>Carregando...</h2>
                        <p className="game-price"><strong>R$ <span className="game-preco">Carregando...</span></strong></p>
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

                        <a href="#" className="cart-btn">Adicionar ao carrinho</a>
                        <button className="wishlist-btn">+ Lista de desejos</button>

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
                    <textarea placeholder="Comente aqui:"></textarea>
                    </div>

                    <div className="comment-list">
                    <div className="comment-box">
                        <img className="comment-avatar" src="../../images/profile_icon.png"></img>
                        <p>Historia fraca ....</p>
                    </div>

                    <div className="comment-box">
                        <img className="comment-avatar" src="../../images/profile_icon.png"></img>
                        <p>Historia divertida ....</p>
                    </div>
                    </div>
                </aside>

                </div>
            </main>
        </Layout>
    );
};

export default GameInfo;
