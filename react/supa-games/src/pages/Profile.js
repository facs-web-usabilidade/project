import { useEffect } from "react";
import "../styles/pages/profile.css";

const Profile = () => {
    useEffect(() => {
        
    }, []);

    return (
        <main className="content profile-content">
            <section className="greetings">
                <h2>Olá, Usuário</h2>
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

                <div className="avatar"><img src="images/profile_icon.png"></img></div>
            </section>

            <section className="reviews-box">
                <fieldset>
                    <legend>
                        <p>Minhas avaliações:</p>
                    </legend>
                </fieldset>

                <fieldset>
                    <legend>
                        <p>Meus comentários: </p>
                    </legend>
                </fieldset>
            </section>
        </main>
    );
};

export default Profile;
