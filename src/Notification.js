import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

const Notification = () => {
  const handleAccept = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/aceitar-novos-termos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
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
      <a href="/novos-termos" target="_blank">Ver Novos Termos</a>
      <form onSubmit={handleAccept}>
        <button type="submit">Aceitar Novos Termos</button>
      </form>
    </div>
  );
};

export default Notification;
