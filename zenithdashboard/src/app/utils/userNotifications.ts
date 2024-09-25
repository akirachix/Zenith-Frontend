
// const url= '/api/notifications/'

// export const fetchNotifications = async () => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     return error;
//   }
// };
// export const createNotification = async (message: string) => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message }),
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     return null;
//   }
// };



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
      } catch {
        // Error handled silently
      }
    };

    fetchNotifications();
  }, []);

  return notifications;
};

export const fetchNotifications = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return null;
  }
};

export const createNotification = async (message: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return null;
  }
};
