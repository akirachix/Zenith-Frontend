import { useState, useEffect } from 'react';

import { fetchNotifications } from '@/app/utils/userNotifications';

export const useGetNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const data = await fetchNotifications();
      if (data) {
        setNotifications(data);
      }
    };

    getNotifications();
  }, []);

  return notifications;
};