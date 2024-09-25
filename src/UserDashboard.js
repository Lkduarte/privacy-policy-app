import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; // Usar a mesma configuração de axios
import { useNavigate, useParams } from 'react-router-dom';
import './App.css'; // Assumindo que há um arquivo CSS compartilhado

const UserDashboard = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        alert('Erro ao carregar os dados do usuário');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/users/${userId}`, userData);
      setIsEditing(false);
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar os dados');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.')) {
      try {
        await axios.delete(`/api/users/${userId}`);
        alert('Conta excluída com sucesso');
        navigate('/');
      } catch (error) {
        alert('Erro ao excluir a conta');
      }
    }
  };

  return (
    <div className="form-container">
      {isEditing ? (
        <form className="dashboard-form" onSubmit={handleEdit}>
          <h1>Painel do Usuário</h1>
          <label>
            Nome:
            <input 
              type="text" 
              value={userData.name} 
              onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={userData.email} 
              onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
              required 
            />
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <div className="dashboard-info">
          <h1>Painel do Usuário</h1>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar Dados</button>
          <button onClick={handleDelete} className="delete-button">Excluir Conta</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
