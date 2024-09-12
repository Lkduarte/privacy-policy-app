import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const UserDashboard = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`/api/users/${userId}`);
      setUserData(response.data);
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/users/${userId}`, userData);
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao atualizar os dados');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.')) {
      try {
        await axios.delete(`/api/users/${userId}`);
        alert('Conta excluída com sucesso');
      } catch (error) {
        alert('Erro ao excluir a conta');
      }
    }
  };

  return (
    <div>
      <h1>Painel do Usuário</h1>
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <label>
            Nome:
            <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
          </label>
          <label>
            Email:
            <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <div>
          <p>Nome: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={() => setIsEditing(true)}>Editar Dados</button>
        </div>
      )}
      <button onClick={handleDelete}>Excluir Conta</button>
    </div>
  );
};

export default UserDashboard;
