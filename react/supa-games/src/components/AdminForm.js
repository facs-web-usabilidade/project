import React, { useState } from 'react';
import apiService from "../services/apiService";
import { getLocalItem } from "../utils/localStorage";

const AdminForm = ({ type, action, onSubmit }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actionNames = { create: 'CRIAR', update: 'ATUALIZAR', delete: 'DELETAR' };
        const typeNames = { Game: 'Jogo', Company: 'Empresa', Profile: 'Perfil', Genre: 'Gênero' };

        const actionName = actionNames[action];
        const typeName = typeNames[type] || type;
        let message = `Tem certeza que deseja ${actionName} este ${typeName}?`;

        if (action === 'delete') {
            message += `\n\nATENÇÃO: Esta ação não pode ser desfeita!`;
        }

        if (!window.confirm(message)) {
            return; 
        }

        const token = getLocalItem("supa_token");
        if (!token) {
            alert("Erro: Você não está logado como administrador.");
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const endpoints = {
            Game: '/jogos',
            Company: '/empresas',
            Profile: '/profile',
            Genre: '/categorias'
        };

        const endpoint = endpoints[type];

        try {
            if (action === 'create') {
                await apiService.post(endpoint, formData, config);
                alert(`${type} criado com sucesso!`);
            } 

            else if (action === 'update') {
                if (!formData.id) {
                    alert("Por favor, insira o ID para atualizar.");
                    return;
                }

                const currentDataRes = await apiService.get(`${endpoint}/${formData.id}`, config);
                const currentData = currentDataRes.data;

                if (!currentData) {
                    alert(`${type} com ID ${formData.id} não encontrado.`);
                    return;
                }

                const mergedData = { ...currentData };
                Object.keys(formData).forEach(key => {
                    if (formData[key] !== "" && formData[key] !== undefined) {
                        mergedData[key] = formData[key];
                    }
                });

                await apiService.put(`${endpoint}/${formData.id}`, mergedData, config);
                alert(`${type} atualizado com sucesso!`);
            } 
            
            else if (action === 'delete') {
                await apiService.delete(`${endpoint}/${formData.id}`, config);
                alert(`${type} deletado com sucesso!`);
            }

            onSubmit(); 

        } catch (error) {
            console.error(error);
            let msg = error.response?.data?.message || error.response?.data?.error || "Erro desconhecido ao processar.";

            if (action === 'delete') {
                if (type === 'Game') {
                    msg += `\n\nProvável Causa: Este jogo está sendo usado em Carrinhos, Listas de desejos ou Avaliações.`;
                } else if (type === 'Company') {
                    msg += `\n\nProvável Causa: Esta empresa possui JOGOS cadastrados. Delete os jogos antes.`;
                }
            }

            alert(`Erro: ${msg}`);
        }
    };

    const renderFields = () => {
        if (type === 'Game') {
            if (action === 'create') {
                return (
                    <>
                        <label>Nome do Jogo</label>
                        <input name="nome" type="text" onChange={handleChange} required />
                        <label>Preço</label>
                        <input name="preco" type="number" step="0.01" onChange={handleChange} required />
                        <label>Desenvolvedora (ID)</label>
                        <input name="fkEmpresa" type="number" onChange={handleChange} required />
                        <label>Descrição</label>
                        <input name="descricao" type="text" onChange={handleChange} />
                        <label>Gênero (ID)</label>
                        <input name="fkCategoria" type="number" onChange={handleChange} required />
                        <label>Ano</label>
                        <input name="ano" type="number" onChange={handleChange} required />
                    </>
                );
            }
            if (action === 'update') {
                return (
                    <>
                        <label style={{color: '#4CFF4C'}}>ID do Jogo (Obrigatório)</label>
                        <input name="id" type="number" placeholder="ID para buscar" onChange={handleChange} required />
                        
                        <hr style={{ margin: '15px 0', border: 0, borderTop: '1px solid #555' }} />
                        <p style={{fontSize: '0.9em', color: '#aaa', marginBottom: '10px'}}>Preencha apenas o que deseja alterar:</p>
                        
                        <label>Novo Nome</label>
                        <input name="nome" type="text" onChange={handleChange} />
                        <label>Novo Preço</label>
                        <input name="preco" type="number" step="0.01" onChange={handleChange} />
                        <label>Nova Desenvolvedora (ID)</label>
                        <input name="fkEmpresa" type="number" onChange={handleChange} />
                        <label>Nova Descrição</label>
                        <input name="descricao" type="text" onChange={handleChange} />
                        <label>Novo Gênero (ID)</label>
                        <input name="fkCategoria" type="number" onChange={handleChange} />
                        <label>Novo Ano</label>
                        <input name="ano" type="number" onChange={handleChange} />
                    </>
                );
            }
            if (action === 'delete') {
                return (
                    <>
                        <label>ID do Jogo para Deletar</label>
                        <input name="id" type="number" onChange={handleChange} required />
                        <p style={{ color: '#ff4444', marginTop: '10px', fontSize: '0.9em' }}>
                            Cuidado: Esta ação apaga o jogo permanentemente.
                        </p>
                    </>
                );
            }
        }

        if (['Company', 'Profile', 'Genre'].includes(type)) {
            const labelMap = { Company: 'Empresa', Profile: 'Perfil', Genre: 'Gênero' };
            const labelName = labelMap[type] || type;

            if (action === 'create') {
                return (
                    <>
                        <label>Nome do(a) {labelName}</label>
                        <input name="nome" type="text" placeholder={`Nome`} onChange={handleChange} required />
                    </>
                );
            }
            if (action === 'update') {
                return (
                    <>
                        <label style={{color: '#4CFF4C'}}>ID do(a) {labelName} (Obrigatório)</label>
                        <input name="id" type="number" placeholder="ID para buscar" onChange={handleChange} required />
                        
                        <hr style={{ margin: '15px 0', border: 0, borderTop: '1px solid #555' }} />
                        <p style={{fontSize: '0.9em', color: '#aaa', marginBottom: '10px'}}>Preencha apenas o que deseja alterar:</p>
                        
                        <label>Novo Nome</label>
                        <input name="nome" type="text" placeholder="Deixe vazio para manter" onChange={handleChange} />
                    </>
                );
            }
            if (action === 'delete') {
                return (
                    <>
                        <label>ID do(a) {labelName} para Deletar</label>
                        <input name="id" type="number" onChange={handleChange} required />
                        <p style={{ color: '#ff4444', marginTop: '10px', fontSize: '0.9em' }}>
                            Cuidado: Esta ação apaga o(a) {labelName} permanentemente.
                        </p>
                    </>
                );
            }
        }

        return <p>Formulário não configurado.</p>;
    };

    const buttonText = action === 'create' ? 'Criar' : action === 'update' ? 'Salvar' : 'Deletar';
    const buttonColor = action === 'delete' ? '#ff4444' : '#28a745';

    return (
        <form onSubmit={handleSubmit} className="side-inputs">
            {renderFields()}
            
            <button 
                type="submit" 
                className="submit-btn" 
                style={{ backgroundColor: buttonColor }}
            >
                {buttonText}
            </button>
        </form>
    );
};

export default AdminForm;