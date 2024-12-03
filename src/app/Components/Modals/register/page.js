'use client'; // Necessário para componentes interativos

import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Alterado para next/navigation
import {Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useModal } from '../../../Provider';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';


import {
	fetchRegister,
  selectloadingRegister,
  selectSucessRegister,
  selectErrorRegister,
  setClearAll
  } from '../../../../../slices/auth';

const Register = ({ modalName, onRegisterSuccess }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const { closeModal, isModalOpen, modalStack } = useModal();
  const dispatch = useDispatch();
  let loadingRegister = useSelector(selectloadingRegister);

  let haveSucessRegister= useSelector(selectSucessRegister);

  useEffect(() => {
    dispatch(setClearAll())
  }, [])

  useEffect(() => {
    //handler do login
    if(haveSucessRegister && sendRequest) {
      //onRegisterSuccess(true);
      closeModal(modalName)
      //router.push('/'); // Direciona para o dashboard após o login
      setSendRequest(false);
    }else if(!haveSucessRegister && sendRequest) {
      //onRegisterSuccess(false);
      setSendRequest(false);
    }
  }, [haveSucessRegister])

  let errorRegister = useSelector(selectErrorRegister);

  useEffect(() => {
    //handler do erro de login
    if(errorRegister) {
      setError(errorRegister)
    }
  }, [errorRegister])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Se o token existir, redireciona para o dashboard
      router.push('/dashboard');
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      address: '',
      nif: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Obrigatório'),
      name: Yup.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome não pode ter mais de 50 caracteres')
    .required('Obrigatório'),

  address: Yup.string()
    .min(6, 'A morada deve ter pelo menos 6 caracteres')
    .max(100, 'A morada não pode ter mais de 100 caracteres')
    .required('Obrigatório'),

  nif: Yup.string()
    .matches(/^\d{9}$/, 'O NIF deve conter exatamente 9 números')
    .required('Obrigatório'),

  phoneNumber: Yup.string()
    .matches(/^\d{9}$/, 'O número de telefone deve conter exatamente 9 números')
    .required('Obrigatório'),

  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(/[\W_]/, 'A senha deve conter pelo menos um caractere especial')
    .required('Obrigatório'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
    .required('Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        let send = {
          "email": values.email,
          "name": values.name,
          "address": values.address,
          "nif": values.nif,
          "phoneNumber": values.phoneNumber,
          "password": values.password,
        }
        setSendRequest(true)
        dispatch(fetchRegister(send))


      } catch (error) {
        setError(error.message);
        //onRegisterSuccess(false);
        toast.error("Error login, try again")
      }
    },
  });

  if (!isModalOpen(modalName)) return null;

  const zIndex = 1000 + modalStack.indexOf(modalName); 

  return (
    <>
    <Modal 
        isOpen={isModalOpen(modalName)} 
        onOpenChange={() => closeModal(modalName)}
        placement="top-center"
        style={{
          zIndex: zIndex,
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Registo</ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  status={formik.touched.email && formik.errors.email ? "error" : "default"}
                  isInvalid={formik.touched.email && formik.errors.email ? true : false}
                  errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Nome"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                  status={formik.touched.name && formik.errors.name ? "error" : "default"}
                  isInvalid={formik.touched.name && formik.errors.name ? true : false}
                  errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Morada"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                  status={formik.touched.address && formik.errors.address ? "error" : "default"}
                  isInvalid={formik.touched.address && formik.errors.address ? true : false}
                  errorMessage={formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="NIF"
                  name="nif"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nif}
                  helperText={formik.touched.nif && formik.errors.nif ? formik.errors.nif : ""}
                  status={formik.touched.nif && formik.errors.nif ? "error" : "default"}
                  isInvalid={formik.touched.nif && formik.errors.nif ? true : false}
                  errorMessage={formik.touched.nif && formik.errors.nif ? formik.errors.nif : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Numero telemovel"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
                  status={formik.touched.phoneNumber && formik.errors.phoneNumber ? "error" : "default"}
                  isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
                  errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Senha"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                  status={formik.touched.password && formik.errors.password ? "error" : "default"}
                  isInvalid={formik.touched.password && formik.errors.password ? true : false}
                  errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                  variant="bordered"
                />

                <Input
                  autoFocus
                  label="Repetir Senha"
                  name="repeatPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repeatPassword}
                  helperText={formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : ""}
                  status={formik.touched.repeatPassword && formik.errors.repeatPassword ? "error" : "default"}
                  isInvalid={formik.touched.repeatPassword && formik.errors.repeatPassword ? true : false}
                  errorMessage={formik.touched.repeatPassword && formik.errors.repeatPassword ? formik.errors.repeatPassword : ""}
                  variant="bordered"
                />

                {error && (
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <p color="error" style={{"color": "red"}}>{error}</p>
                    </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => closeModal('registerModal')}>
                  Close
                </Button>
                {!loadingRegister && 
                  <Button type="submit" shadow color="primary" auto disabled={loadingRegister}>
                    Registar
                  </Button>
                }
                {loadingRegister && 
                  <Spinner />
                }
              </ModalFooter>
              </form>
              </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Register;
