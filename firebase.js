import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAaRYEaC2BvCo7QRWmvV7p_GZ0KJQLJl0A",
  authDomain: "fazte-80db7.firebaseapp.com",
  projectId: "fazte-80db7",
  storageBucket: "fazte-80db7.firebasestorage.app",
  messagingSenderId: "651155767425",
  appId: "1:651155767425:web:53e158e91ed40ccad90d80",
  measurementId: "G-82DPEZDPSP"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;