import React, { useState } from "react";
import "../styles/pages/admin.css";
import AdminModal from "../components/AdminModal";
import AdminForm from "../components/AdminForm";

const Admin = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type, action) => {
        setActiveModal({ type, action });
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const handleFormSubmit = () => {
        closeModal();
    };

    const getTitle = (type, action) => {
        const actionMap = { create: 'Criar', update: 'Gerenciar', delete: 'Deletar' };
        const typeMap = { Game: 'Jogo', Company: 'Empresa'}; 
        return `${actionMap[action]} ${typeMap[type]}`;
    };

    const renderMenuSection = (title, type) => (
        <div className="admin-section">
            <h3>{title}</h3>
            <div className="admin-actions">
                <button className="admin-btn" onClick={() => openModal(type, 'create')}>Criar</button>
                {type !== 'Profile' && type !== 'Genre' && (
                    <>
                        <button className="admin-btn" onClick={() => openModal(type, 'update')}>Gerenciar</button>
                        <button className="admin-btn" onClick={() => openModal(type, 'delete')}>Deletar</button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <main className="content-grid">
            <div className="admin-container">
                
                <div className="form-container">
                    <div className="form-title">
                        <h2>Admin</h2>
                    </div>
                    <div className="form-main">
                        {renderMenuSection("Jogos", "Game")}
                        {renderMenuSection("Empresa", "Company")}
                    </div>
                </div>

                {!activeModal && (
                    <div className="admin-icon-container">
                        <img src="/images/games_icon.png" alt="Admin Gamepad" /> 
                    </div>
                )}

                {activeModal && (
                    <AdminModal 
                        title={getTitle(activeModal.type, activeModal.action)} 
                        onClose={closeModal}
                    >
                        <AdminForm 
                            type={activeModal.type} 
                            action={activeModal.action} 
                            onSubmit={handleFormSubmit} 
                        />
                    </AdminModal>
                )}

            </div>
        </main>
    );
};

export default Admin;