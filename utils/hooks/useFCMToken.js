'use client'
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../../firebase';

const useFcmToken = () => {
  const [token, setToken] = useState('');
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Request notification permission
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === 'granted') {
            const currentToken = await getToken(messaging, {
              vapidKey: 'BIgdjusJGPug94j0e-x53y03p_H-ePf9UwDhYNHoP4KazXDPTghDOs26AYUq8ZYAO4n5jH6N-9wCKcOiieG2I4Y', // Replace with your Firebase project's VAPID key
            });
            if (currentToken) {
              setToken(currentToken);
              console.log(currentToken)
              alert(currentToken)
              alert(currentToken)
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          } 
        }
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };

    retrieveToken();
  }, []);

  return { notificationPermissionStatus };
};

export default useFcmToken;