import React, { useEffect, useState } from 'react';
import axios from '../../server/axiosConfig';
import '../App.css';

const ConsentHistory = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/consent-history`);
        setHistory(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de consentimento", error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="consent-history-container">
      <h2>Histórico de Consentimento</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((entry) => (
            <li key={entry.id}>Consentimento dado em: {entry.date}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum histórico de consentimento encontrado.</p>
      )}
    </div>
  );
};

export default ConsentHistory;
