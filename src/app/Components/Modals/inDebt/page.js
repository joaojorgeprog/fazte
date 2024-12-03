'use client'; // Necessário para componentes interativos

import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Alterado para next/navigation
import {Spinner, 
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useModal } from '../../../Provider';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {signIn} from "next-auth/react"

import {
	selectLoadingDebt,
  selectDebt,
  selectErrorDebt,
  fetchDebt,
  selectTotalDebt
  } from '../../../../../slices/associates';

const InDebt = ({ modalName, onLoginSuccess }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const { closeModal, isModalOpen, modalStack } = useModal();
  const dispatch = useDispatch();

  let loadingDebt = useSelector(selectLoadingDebt);

  let errorDebt = useSelector(selectErrorDebt);

  let debt = useSelector(selectDebt);

  let total = useSelector(selectTotalDebt);

  useEffect(() => {
    //handler do erro de login
    if(errorDebt) {
      setError(errorDebt)
    }
  }, [errorDebt])

  useEffect(() => {
    if(debt) {
      console.log("debt")
      console.log(debt)
    }
  }, [debt])

  useEffect(() => {
    if(total) {
      console.log("total")
      console.log(total)
    }
  }, [total])

  const zIndex = 1000 + modalStack.indexOf(modalName); 


  if (!isModalOpen(modalName)) return null;

  return (
    <>
    <Modal 
        isOpen={isModalOpen(modalName)} 
        onOpenChange={() => closeModal(modalName)}
        placement="center"
        style={{
          zIndex: zIndex,
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Em divida</ModalHeader>
          <ModalBody>
            {debt && debt.map((item, index) => (
              <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
              
                <div className="flex flex-col">
                  <p className="text-md">{item.season}</p>
                  <p className="text-small text-default-500">{item.tipo}</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardFooter>
                <p>{item.valor} €</p>
              </CardFooter>
              </Card>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => closeModal(modalName)}>
              Fechar
            </Button>
            <Button color="primary" variant="flat" onPress={() => closeModal(modalName)}>
              Pagar {total} €
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InDebt;
