'use client'
// src/components/AllowModal.js
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { useModal } from '../../../Provider';

const AllowModal = ({ modalName, onPermissionGranted }) => {
  const { isModalOpen, closeModal, modalStack } = useModal();

  if (!isModalOpen(modalName)) return null;

  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        onPermissionGranted(true);
        closeModal(modalName);
        stream.getTracks().forEach(track => track.stop()); // Fecha a câmera após conceder permissão
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      setErrorMessage('Erro ao acessar a câmera. Por favor, verifique suas configurações de permissão.');
    }
  };

  const zIndex = 1000 + modalStack.indexOf(modalName);

  return (
    <Modal 
      isOpen={isModalOpen(modalName)} 
      onOpenChange={() => closeModal(modalName)}
      placement="top-center"
      style={{
          zIndex: zIndex,
        }}
    >
      <ModalContent>
        <ModalHeader>Permissão Necessária</ModalHeader>
        <ModalBody>
          <p>Você precisa permitir o acesso à câmera.</p>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleRequestPermission}>Permitir Câmera</Button>
          <Button onPress={() => closeModal(modalName)}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AllowModal;
