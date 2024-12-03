// src/context/ModalContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [openModals, setOpenModals] = useState({});

  const openModal = (modalName) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setOpenModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const isModalOpen = (modalName) => {
    return !!openModals[modalName];
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
