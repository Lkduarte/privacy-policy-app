import React from 'react';
import axios from './axiosConfig';

const Notification = () => {
  const handleAcceptTerms = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/aceitar-novos-termos');
      if (response.status === 200) {
        alert('Você aceitou os novos termos.');
      } else {
        alert('Houve um problema ao aceitar os termos.');
      }
    } catch (error) {
      alert('Erro ao aceitar os novos termos.');
    }
  };

  return (
    <div>
      <h1>Notificação de Alterações</h1>
      <p>Os termos de uso foram atualizados. Por favor, reveja e aceite os novos termos.</p>
      <a href="/novos-termos" target="_blank" rel="noopener noreferrer">Ver Novos Termos</a>
      <form onSubmit={handleAcceptTerms}>
        <button type="submit">Aceitar Novos Termos</button>
      </form>
    </div>
  );
};

export default Notification;
