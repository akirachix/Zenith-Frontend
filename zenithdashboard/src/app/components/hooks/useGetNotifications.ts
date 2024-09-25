

import { useState, useEffect } from 'react';

const API_URL = '/api/notifications/';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        return error
        
      }
    };

    fetchNotifications();
  }, []);

  return notifications;
};





