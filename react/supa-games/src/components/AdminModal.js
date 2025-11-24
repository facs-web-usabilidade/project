import React from 'react';
import '../styles/pages/admin.css';

const AdminModal = ({ title, onClose, children }) => {
    return (
        <div className="side-panel active">
            <button className="close-btn" onClick={onClose}>X</button>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{title}</h2>

            <div style={{ width: '100%', overflowY: 'auto' }}>
                {children}
            </div>
        </div>
    );
};

export default AdminModal;