import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(`/api/users/${userId}/notifications`);
      setNotifications(response.data);
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2>Notificações</h2>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          <a href={notification.link} target="_blank" rel="noopener noreferrer">Ver Detalhes</a>
        </div>
      ))}
    </div>
  );
};

export default Notification;
