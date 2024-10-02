import React, { useState } from "react";
import axios from '../../server/axiosConfig';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Termo = () => {
  const [consent, setConsent] = useState(false);
  const [option, setOption] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleAcceptTerms = async (event) => {
    event.preventDefault();
    if (consent) {
      try {
        const response = await axios.post('api/aceitar-novos-termos', { user_id: userId });
        if (response.status === 200) {
          alert('Você aceitou os novos termos.');
          navigate('/dashboard'); // Redirecionar para o dashboard
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
        <label><p>Você deseja receber notificações por:</p>
        <input
            type="checkbox"
            checked={option}
            onChange={(e) => setOption(e.target.checked)}
            required
          />E-mail<p></p>
          <input
            type="checkbox"
            checked={option}
            onChange={(e) => setOption (e.target.checked)}
            required
          />SMS
          <p></p>
          <input
            type="checkbox"
            checked={option}
            onChange={(e) => setOption (e.target.checked)}
            required
          />Whatsapp<p></p><br></br>
          <p></p>
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

export default Termo;
