import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import "../styles/pages/login.css";

const Login = () => {
    useEffect(() => {
        
    }, []);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [statusClass, setStatusClass] = useState("feedback-pending");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function validateInput(value, setter, message) {
        if (!value.trim()) {
            setter(message);
            return false;
        }
        return true;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setStatusClass("feedback-pending");
        setLoginStatus("");
        setEmailError("");
        setPasswordError("");

        const validEmail = validateInput(
            email,
            setEmailError,
            "Por favor, digite o seu email no campo acima."
        );

        const validPassword = validateInput(
            senha,
            setPasswordError,
            "Por favor, digite a sua senha no campo acima."
        );

        if (!validEmail || !validPassword) return;

        const userLogin = { email, senha };

        try {
            setLoading(true);
            setLoginStatus("Verificando suas credenciais, por favor aguarde...");
            await sleep(1000);

            const response = await apiService.post("/auth/login", userLogin);
        
            const loginData = response.data;
            localStorage.setItem("supa_token", loginData.token);

            setStatusClass("feedback-success");
            setLoginStatus(
                "Credenciais verificadas com sucesso! Em breve você será redirecionado(a) para a loja, por favor aguarde..."
            );

            await sleep(2000);
            navigate("/");
        } catch (err) {
            setStatusClass("feedback-error");
            if (!err.response || (err.response.status !== 404 && err.response.status !== 401)) {
                setLoginStatus("Não foi possível contactar o servidor. Tente novamente mais tarde.");
            } else {
                setLoginStatus("Email ou senha incorretos..");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <header>
                <div className="header-bar">
                    <img
                        src="/logo512.png"
                        width="50px"
                        height="50px"
                        alt="SUPA games logo"
                    />
                    <h2>SUPA-Games</h2>
                </div>
            </header>

            <main>
                <h2 className="title-small-screen">
                    Entre para a maior loja de jogos da América Latina
                </h2>

                <div className="container-container">
                    <div className="intro-register-container">
                        <h2 className="title-big-screen">
                            Entre para a maior loja de jogos da América Latina
                        </h2>

                        <div className="intro-register-container-subtitle">
                            <h3>Ainda não tem uma conta?</h3>
                            <p>
                                Cadastre-se agora e aproveite acesso exclusivo aos últimos lançamentos,
                                novidades e muito mais!
                            </p>
                        </div>

                        <a href="/register">
                            <button type="button">Cadastre-se</button>
                        </a>
                    </div>

                    <div className="form-container">
                        <div className="form-title">
                            <h3>Já possui uma conta?</h3>
                            <p>Acesse a loja utilizando suas credenciais abaixo:</p>
                        </div>

                        <div className="form-main">
                            <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                                <div className="form-input">
                                    <div className="form-label">
                                        <label htmlFor="email">E-mail</label>
                                    </div>

                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Exemplo: joaossouza@email.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError("");
                                        }}
                                        autoComplete="email"
                                    />
                                    <span id="email-error" className="error-message">
                                        {emailError}
                                    </span>
                                </div>

                                <div className="form-input">
                                    <div className="form-label">
                                        <label htmlFor="senha">Senha</label>
                                    </div>

                                    <input
                                        id="senha"
                                        type="password"
                                        placeholder="Digite a sua senha"
                                        value={senha}
                                        onChange={(e) => {
                                            setSenha(e.target.value);
                                            setPasswordError("");
                                        }}
                                    />
                                    <span id="password-error" className="error-message">
                                        {passwordError}
                                    </span>
                                </div>

                                <button type="submit" id="login-button" disabled={loading}>
                                    Entrar
                                </button>

                                <span id="login-status" className={`error-message ${statusClass}`}>
                                    {loginStatus}
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
