'use client'; // Necessário para componentes interativos

import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Alterado para next/navigation
import {Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Tabs, Tab} from "@nextui-org/react";
import { useModal } from '../../../Provider';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {signIn} from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { Divider } from "@nextui-org/divider";

import {
	fetchLogin,
  selectLoadingLogin,
  selectHavelogin,
  selectErrorLogin,
  setClearAll,
  fetchRegister,
  selectloadingRegister
  } from '../../../../../slices/auth';

const Login = ({ modalName, onLoginSuccess }) => {
  let loadingRegister = useSelector(selectloadingRegister);
  const [selected, setSelected] = useState("login");
  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const { closeModal, isModalOpen, modalStack } = useModal();
  const dispatch = useDispatch();
  let loadingLogin = useSelector(selectLoadingLogin);

  useEffect(() => {
    dispatch(setClearAll())
  }, [])

  let haveLogin = useSelector(selectHavelogin);

  useEffect(() => {
    //handler do login
    if(haveLogin && sendRequest) {
      //onLoginSuccess(true);
      closeModal(modalName)
      //router.push('/'); // Direciona para o dashboard após o login
      setSendRequest(false);
    }else if(!haveLogin && sendRequest) {
      //onLoginSuccess(false);
      setSendRequest(false);
    }
  }, [haveLogin])

  let errorLogin = useSelector(selectErrorLogin);

  useEffect(() => {
    //handler do erro de login
    if(errorLogin) {
      setError(errorLogin)
    }
  }, [errorLogin])


  const formikLogin = useFormik({
    initialValues: {
      email: "",
      socioNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Email é obrigatório"),
      socioNumber: Yup.string().required("Número de sócio é obrigatório"),
      password: Yup.string().required("Senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      try {
        let send = {
          "email": values.email,
          "password": values.password
        }
        signIn("credentials", {
            ...send,
            callbackUrl: "/dashboard"
        })

        //setSendRequest(true)
        //dispatch(fetchLogin(send))

      } catch (error) {
        console.log("aqui erro catch")
        console.log(error.message)
        setError(error.message);
        //onLoginSuccess(false);
        toast.error("Error login, try again")
      }
    },
  });

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

  const zIndex = 1000 + modalStack.indexOf(modalName); 

  if (!isModalOpen(modalName)) return null;

  return (
    <>
    <Modal 
        hideCloseButton={true}
        isOpen={isModalOpen(modalName)} 
        onOpenChange={() => closeModal(modalName)}
        placement="center"
        style={{
          zIndex: zIndex,
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
              <form onSubmit={formikLogin.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Email"
                    name="email"
                    type="email"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.email}
                    helperText={formikLogin.touched.email && formikLogin.errors.email ? formikLogin.errors.email : ""}
                    status={formikLogin.touched.email && formikLogin.errors.email ? "error" : "default"}
                    isInvalid={formikLogin.touched.email && formikLogin.errors.email ? true : false}
                    errorMessage={formikLogin.touched.email && formikLogin.errors.email ? formikLogin.errors.email : ""}
                    variant="bordered"
                  />

                    <Input
                    autoFocus
                    label="Senha"
                    name="password"
                    type="password"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.password}
                    helperText={formikLogin.touched.password && formikLogin.errors.password ? formikLogin.errors.password : ""}
                    status={formikLogin.touched.password && formikLogin.errors.password ? "error" : "default"}
                    isInvalid={formikLogin.touched.password && formikLogin.errors.password ? true : false}
                    errorMessage={formikLogin.touched.password && formikLogin.errors.password ? formikLogin.errors.password : ""}
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm" onPress={() => openModal('registerModal')}>
                      Forgot password?
                    </Link>
                  </div>
                  {error && (
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <p color="error" style={{"color": "red"}}>{error}</p>
                    </div>
                )}
                </ModalBody>
                    <div className="px-2 flex flex-col items-center justify-center">
                      <p className="text-center">or</p>
                      <Divider />
                      <button
                        onClick={() => signIn("google")}
                        className="flex items-center px-5 py-2 border border-gray-300 rounded cursor-pointer text-base mt-2"
                      >
                        <FcGoogle className="mr-2 text-xl" />
                        Entrar com Google
                      </button>
                    </div>
                
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={() => closeModal(modalName)}>
                    Close
                  </Button>
                  {!loadingLogin && 
                    <Button type="submit" shadow color="primary" auto disabled={loadingLogin}>
                      Entrar
                    </Button>
                  }
                  {loadingLogin && 
                    <Spinner />
                  }
                </ModalFooter>
                
                </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form onSubmit={formik.handleSubmit}>
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
                          <p color="error" style={{ "color": "red" }}>{error}</p>
                        </div>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={() => closeModal(modalName)}>
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
                </Tab>
              </Tabs>
              </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
