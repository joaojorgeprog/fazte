'use client'; // Necessário para componentes interativos
import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. import `NextUIProvider` component
import { NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import LoadingSpinner from './Components/LoadingSpinner'
import { useRouter } from 'next/navigation';
import { SessionProvider } from "next-auth/react";
import FcmTokenComp from '../../utils/hooks/firebaseForeground';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export default function Provider({children}) {

  const router = useRouter();
  const [modalStack, setModalStack] = useState([]); // Pilha de modais
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = (modalName) => {
    setModalStack((prevStack) => [...prevStack, modalName]);
  };

  const closeModal = (modalName) => {
    setModalStack((prevStack) => prevStack.filter((name) => name !== modalName));
  };

  const isModalOpen = (modalName) => modalStack.includes(modalName);

  useEffect(() => {
    const user = localStorage.getItem('dsadsadada'); // Verifica se o usuário está no localStorage
    if (user) {
      setIsAuthenticated(true); // Usuário autenticado
    } else {
      router.push('/'); // Redireciona para a página de login se não autenticado
    }
    setLoading(false); // Define loading como false após a verificação
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(err => {
          console.error('Falha ao registrar o Service Worker:', err);
        });
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <NextUIProvider>
        <NextThemesProvider attribute="class">
          <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, modalStack }}>
            <SessionProvider>
            <AuthWrapper>{children}</AuthWrapper>
            </SessionProvider>
          </ModalContext.Provider>
        </NextThemesProvider>
      </NextUIProvider>
    </ReduxProvider>
  );
}

function AuthWrapper({ children }) {
  return (
    <>
      <FcmTokenComp />
      {children}
    </>
  );
}