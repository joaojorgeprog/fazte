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
import Footer from './Components/Footer/index'
import Script from 'next/script'

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

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-82DPEZDPSP', { page_path: url });
    };

    // Assinando o evento para mudança de rota
    window.addEventListener('routeChangeComplete', handleRouteChange);

    return () => {
      // Remover evento ao desmontar
      window.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <ReduxProvider store={store}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-82DPEZDPSP`} // Substitua pelo seu ID do Google Analytics
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-82DPEZDPSP', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

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
      <Footer />
    </>
  );
}