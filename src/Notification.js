import React, { useState } from "react";
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import "./App.css";

const Notification = () => {
  const [consent, setConsent] = useState(false);
  const navigate = useNavigate();

  const handleAcceptTerms = async (event) => {
    event.preventDefault();
    if (consent) {
      try {
        const response = await axios.post('/aceitar-novos-termos');
        if (response.status === 200) {
          alert('Você aceitou os novos termos.');
          navigate('/dashboard'); // Redirecionar para o dashboard ou qualquer outra página apropriada
        } else {
          alert('Houve um problema ao aceitar os termos.');
        }
      } catch (error) {
        alert('Erro ao aceitar os novos termos.');
      }
    } else {
      alert('Você deve concordar com os termos de uso.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleAcceptTerms}>
        <h1>Notificação de Alterações</h1>
        <p>Os termos de uso foram atualizados. Por favor, reveja e aceite os novos termos.</p>
        <a href="/novos-termos" target="_blank" rel="noopener noreferrer">
          Ver Novos Termos
        </a>
        <label>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          Eu li e concordo com os{" "}
          <a href="/novos-termos" target="_blank">
            novos termos de uso
          </a>.
        </label>
        <button type="submit">Aceitar Novos Termos</button>
      </form>
    </div>
  );
};

export default Notification;
