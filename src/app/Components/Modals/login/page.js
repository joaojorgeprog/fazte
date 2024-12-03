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
import {signIn} from "next-auth/react"

import {
	fetchLogin,
  selectLoadingLogin,
  selectHavelogin,
  selectErrorLogin,
  setClearAll
  } from '../../../../../slices/auth';

const Login = ({ modalName, onLoginSuccess }) => {
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


  const formik = useFormik({
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
          "associateNumber": parseInt(values.socioNumber),
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

  const zIndex = 1000 + modalStack.indexOf(modalName); 

  if (!isModalOpen(modalName)) return null;

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
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
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
                  label="Número de Sócio"
                  name="socioNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.socioNumber}
                  helperText={formik.touched.socioNumber && formik.errors.socioNumber ? formik.errors.socioNumber : ""}
                  status={formik.touched.socioNumber && formik.errors.socioNumber ? "error" : "default"}
                  isInvalid={formik.touched.socioNumber && formik.errors.socioNumber ? true : false}
                  errorMessage={formik.touched.socioNumber && formik.errors.socioNumber ? formik.errors.socioNumber : ""}
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
              </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
