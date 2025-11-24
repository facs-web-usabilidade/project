import { useEffect, useState } from "react";
import "../styles/pages/profile.css";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);

    const token = getLocalItem("supa_token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        loadProfile();
        // loadUserReviews();
        loadUserReviews();
    }, []);

    async function loadProfile() {
        try {
            const res = await apiService.get("/avaliacoes/", config);
            const keyUser = res.data[0].fkUsuario
            const usr = await apiService.get(`/usuarios/${keyUser}`, config); // http://localhost:3000/api/v1/usuarios/:fkUsuario
            // console.log(usr.data.nome)
            setUser(usr.data);
        } catch (err) {
            console.error("Erro ao carregar usuário:", err);
        }
    }

    async function loadUserReviews() {
        try {
            const res = await apiService.get("/avaliacoes/", config); 
            const list = res.data || [];

            const formatted = await Promise.all(
                list.map(async (rev) => {
                    try {
                        const jogoRes = await apiService.get(`/jogos/${rev.fkJogo}`, config);
                        return {
                            nota: rev.nota,
                            comentario: rev.comentario,
                            jogoNome: jogoRes.data?.nome || "Jogo X"
                        };
                    } catch {
                        return {
                            nota: rev.nota,
                            comentario: rev.comentario,
                            jogoNome: "Jogo X"
                        };
                    }
                })
            );

            setReviews(formatted);

        } catch (err) {
            console.error("Erro ao carregar avaliações:", err);
            setReviews([]);
        }
    }

    return (
        <main className="content profile-content">
            <section className="greetings">
                <h2>Olá, {user?.nome || "novo usuário."}</h2>
            </section>

            <section className="profile-box">
                <div className="card-links">
                    <a href="myGames" className="profile-card">
                        <h3>Meus Jogos</h3>
                        <p>Ver todos os jogos da sua conta</p>
                    </a>

                    <a href="history" className="profile-card">
                        <h3>Histórico de Compras</h3>
                        <p>Veja todas a suas compras</p>
                    </a>

                    <a href="settings" className="profile-card">
                        <h3>Configurações</h3>
                        <p>Veja todas as configurações da sua conta</p>
                    </a>
                </div>

                <div className="avatar">
                    <img src="images/profile_icon.png" />
                </div>
            </section>

            <section className="reviews-box">
                <fieldset>
                    <legend>
                        <p><span className="profile-reviews-game-title">Minhas avaliações:</span></p>
                    </legend>

                    {reviews.length === 0 ? (
                        <p>Nenhuma avaliação encontrada.</p>
                    ) : (
                        reviews.map((rev, index) => (
                            <div key={index} className="review-line">
                                <p>
                                    <span className="profile-reviews-game-stars">{rev.nota} ★ </span>
                                    <span className="profile-reviews-game-name">{rev.jogoNome}</span>
                                    <br></br><span className="profile-reviews-game-comment-label">Comentário: </span><span className="profile-reviews-game-comment">{rev.comentario}</span>
                                </p>
                                <hr className="profile-reviews-game-hr"/>
                            </div>
                        ))
                    )}

                </fieldset>
            </section>
        </main>
    );
};

export default Profile;
