import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/register.css";

const Register = () => {
    useEffect(() => {
        
    }, []);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        repeteSenha: "",
    });

    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        repeteSenha: "",
    });

    const [registerStatus, setRegisterStatus] = useState("");
    const [statusClass, setStatusClass] = useState("feedback-pending");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    function validateFields() {
        let newErrors = { nome: "", email: "", senha: "", repeteSenha: "" };
        let isValid = true;
        let passwords = [];

        if (form.nome.trim() === "") {
            newErrors.nome = "O nome não pode estar em branco";
            isValid = false;
        }

        if (form.email.trim() === "") {
            newErrors.email = "O e-mail não pode estar em branco";
            isValid = false;
        } else if (!form.email.includes("@")) {
            newErrors.email = "O e-mail deve estar no formato nome@dominio.com";
            isValid = false;
        }

        if (form.senha.trim() === "") {
            newErrors.senha = "A senha não pode ser em branco";
            isValid = false;
        } else if (form.senha.length < 8) {
            newErrors.senha = "A senha deve ter no mínimo 8 caracteres";
            isValid = false;
        } else {
            passwords.push(form.senha);
        }


        if (form.repeteSenha.trim() === "") {
            newErrors.repeteSenha = "Confirmação de senha não pode ser em branco";
            isValid = false;
        } else if (form.repeteSenha.length < 8) {
            newErrors.repeteSenha = "Confirmação deve ter no mínimo 8 caracteres";
            isValid = false;
        } else {
            passwords.push(form.repeteSenha);
        }

        if (passwords.length === 2 && passwords[0] !== passwords[1]) {
            newErrors.repeteSenha = "As senhas devem coincidir";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setStatusClass("feedback-pending");
        setRegisterStatus("");

        if (!validateFields()) return;

        const userToRegister = {
            nome: form.nome,
            email: form.email,
            senha: form.senha,
            repeteSenha: form.repeteSenha,
        };

        try {
            setLoading(true);
            setRegisterStatus("Realizando o seu cadastro, por favor aguarde...");

            let response = await fetch("http://localhost:3000/api/v1/auth/register", {
                method: "POST",
                body: JSON.stringify(userToRegister),
                headers: { "Content-Type": "application/json" },
            });

            const registerData = await response.json();

            await sleep(3000);

            if (response.ok) {
                const usuario = { email: userToRegister.email, senha: userToRegister.senha };

                response = await fetch("http://localhost:3000/api/v1/auth/login", {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        "Content-type": "application/json"
                    }
                });

                const loginData = await response.json();
                localStorage.setItem("supa_token", loginData.token);

                setStatusClass("feedback-success");
                setRegisterStatus(
                    "Cadastro realizado com sucesso! Em breve você será redirecionado(a) para a loja, por favor aguarde..."
                );

                await sleep(3000);
                navigate("/");
            } else {
                throw new Error();
            }
        } catch (err) {
            setStatusClass("feedback-error");
            setRegisterStatus("Não foi possível contactar o servidor. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
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
                <div className="form-container">
                    <div className="form-title">
                        <h2>Cadastre-se</h2>
                    </div>

                    <div className="form-main">
                        <form className="registerForm" onSubmit={handleSubmit}>

                            <div className="form-input">
                                <div className="form-label">
                                    <label htmlFor="nome">Nome</label>
                                </div>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="Exemplo: João Silva Souza"
                                    value={form.nome}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                                <span className="error-message">{errors.nome}</span>
                            </div>

                            <div className="form-input">
                                <div className="form-label">
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Exemplo: joaossouza@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                                <span className="error-message">{errors.email}</span>
                            </div>

                            <div className="form-input">
                                <div className="form-label">
                                    <label htmlFor="senha">Senha</label>
                                </div>
                                <input
                                    id="senha"
                                    type="password"
                                    placeholder="Digite uma senha forte"
                                    value={form.senha}
                                    onChange={handleChange}
                                />
                                <span className="error-message">{errors.senha}</span>
                            </div>

                            <div className="form-input">
                                <div className="form-label">
                                    <label htmlFor="repeteSenha">Confirmação de senha</label>
                                </div>
                                <input
                                    id="repeteSenha"
                                    type="password"
                                    placeholder="Repita a senha anterior"
                                    value={form.repeteSenha}
                                    onChange={handleChange}
                                />
                                <span className="error-message">{errors.repeteSenha}</span>
                            </div>

                            <button type="submit" id="register-button" disabled={loading}>Cadastrar</button>
                            <span id="register-status" className={`error-message ${statusClass}`}>
                                {registerStatus}
                            </span>
                        </form>
                    </div>

                    <div className="to-login">
                        <p>
                            Já tem cadastro? <a href="/login">Clique aqui!</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;