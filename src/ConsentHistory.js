import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConsentHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(`/api/users/${userId}/consent-history`);
      setHistory(response.data);
    };

    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h2>Histórico de Consentimento</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry.id}>Consentimento dado em: {entry.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConsentHistory;
