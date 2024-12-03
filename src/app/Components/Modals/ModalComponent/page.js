'use client'; // Necessário para componentes interativos

import { useState, useEffect } from 'react';
import {Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useModal } from '../../../Provider';


const ModalComponent = ({ modalName, text, header, optionA, optionB, optionTextA, optionTextB }) => {
  const { isModalOpen, closeModal, modalStack } = useModal();

  if (!isModalOpen(modalName)) return null;

  const zIndex = 1000 + modalStack.indexOf(modalName);

  return (
    <Modal 
        isOpen={isModalOpen(modalName)} 
        onOpenChange={() => closeModal(modalName)}
        placement="center"
        style={{
          marginInline: "2%",
          zIndex: zIndex,
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
              <ModalBody>
                <p>{text}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => optionA()}>
                    {optionTextA}
                </Button>
                <Button shadow color="primary" auto onPress={() => optionB()}>
                    {optionTextB}
                </Button>
              </ModalFooter>
              </>
          )}
        </ModalContent>
      </Modal>
  );
}

export default ModalComponent;
