import { useEffect, useState } from "react";
import "../styles/pages/settings.css";
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const Settings = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const token = getLocalItem("supa_token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        
    }, []);

    async function handleChangePassword() {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Preencha todos os campos!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("A nova senha e a confirmação não coincidem!");
            return;
        }

        const confirmar = window.confirm(
            `Você deseja mesmo trocar sua senha?\n\n[Clique em OK para confirmar]`
        );

        if (!confirmar) return;

        try {
            // currentPassword e newPassword
            const res = await apiService.put(`/auth/change-password`,{ currentPassword: oldPassword, newPassword: newPassword }, config);

            alert(res.data?.message || "Senha alterada com sucesso!");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            const status = err.response?.status;

            if (status === 401) {
                alert("Senha atual incorreta.");
                return;
            }

            alert("Erro ao alterar a senha:" + status);
        }
    }

    // autoComplete está bugando um pouco aqui, infelizmente n consegui resolver

    return (
        <main className="content">
            <section className="settings-box">

                <h2>Configurações da Conta</h2>

                <fieldset className="password-box">
                    <legend><h3>Trocar senha</h3></legend>

                    <label>Senha atual:</label><br></br>
                    <input id="pswdOld" autoComplete="current-password" name="current-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>

                    <br></br>

                    <label>Nova senha:</label><br></br>
                    <input id="pswdNew" autoComplete="new-password" name="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

                    <br></br>

                    <label>Confirmar nova senha:</label><br></br>
                    <input id="pswdNew" autoComplete="new-password" name="new-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <br></br>

                    <button className="confirm-btn" onClick={handleChangePassword}>
                        Alterar senha
                    </button>
                </fieldset>

            </section>
        </main>
    );
};

export default Settings;
