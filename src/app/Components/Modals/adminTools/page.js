'use client'; // Necessário para componentes interativos

import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Alterado para next/navigation
import {Divider, Tab,Tabs, CardBody, DatePicker, Card, RadioGroup, Radio, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useModal } from '../../../Provider';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {startOfWeek, startOfMonth, getLocalTimeZone, today} from "@internationalized/date";
import TableTipoSocios from '../../tables/tableTipoSocios'

import {
	fetchRegister,
  selectloadingRegister,
  selectSucessRegister,
  selectErrorRegister,
  setClearAll
  } from '../../../../../slices/auth';

const AdminTools = ({ modalName, selectedValue, edit }) => {
  const { isModalOpen, closeModal, modalStack } = useModal();

  if (!isModalOpen(modalName)) return null;

  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const dispatch = useDispatch();
  let loadingRegister = useSelector(selectloadingRegister);
  const [selected, setSelected] = React.useState(selectedValue);
  const [criarTipoSocio, setCriarTipoSocio] = React.useState(false);

  let haveSucessRegister= useSelector(selectSucessRegister);

  useEffect(() => {
    console.log("dentro olate")
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
      associateNumber: '',
      gener: '',
      dataNascimento: today(getLocalTimeZone())
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
    
    associateNumber: Yup.string()
      .matches(/^\d{9}$/, 'O número de telefone deve conter exatamente 9 números')
      .required('Obrigatório'),
    dataNascimento: Yup.date().required("Data nascimento é obrigatória")
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
            "gener": values.gener,
            "associateNumber": values.associateNumber
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

  useEffect(() => {
    if(formik.errors) {
      console.log("formik.errors")
      console.log(formik.errors)
    }
  }, [formik.errors])

  useEffect(() => {
    console.log('Formik touched:', formik.touched);
    console.log('Formik errors:', formik.errors);
  }, [formik.touched, formik.errors]);


  const editType = (dat) => {
    edit(dat)
  }

  const zIndex = 1000 + modalStack.indexOf(modalName);

  return (
    <>
    <Modal 
        backdrop="opaque" 
        isOpen={isModalOpen(modalName)} 
        onOpenChange={() => closeModal(modalName)}
        placement="center"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
        style={{
          marginInline: "2%",
          zIndex: zIndex,
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Card className="max-w-full min-w-[100%] items-center">
                <CardBody className="overflow-hidden gap-4">
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    className='max-w-full items-center flex flex-col'
                  >
                    <Tab key="season" title="Seasons" className='max-w-full items-center flex flex-col' >
                      {!criarTipoSocio && 
                        <Button className="mb-5" style={{width: '100%'}} type="submit" onClick={() =>  setCriarTipoSocio(true)} shadow color="primary" auto disabled={criarTipoSocio}>
                          Criar Novo Tipo +
                        </Button>
                      }
                      {criarTipoSocio && 
                        <form onSubmit={formik.handleSubmit}>
                          <ModalHeader className="flex flex-col gap-1">Criar Tipo Socio</ModalHeader>
                          <ModalBody>
                            <div className="grid grid-cols-12 gap-4">
                              <div className="col-span-6">
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
                                  labelPlacement="outside"
                                />
                              </div>
                              <div className="col-span-6">
                                <Input
                                    type="number"
                                    label="Valor"
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    endContent={
                                      <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">€</span>
                                      </div>
                                    }
                                  />
                              </div>
                            </div>

                            {error && (
                              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                <p color="error" style={{"color": "red"}}>{error}</p>
                                </div>
                            )}
                          </ModalBody>
                          <div className='mb-5' style={{float: 'inline-end', marginInline: '6%'}}>
                            {!loadingRegister && 
                              <Button color="danger" variant="flat" onClick={() =>  setCriarTipoSocio(false)} shadow auto disabled={loadingRegister}>
                                Cancelar
                              </Button>
                            }
                            {!loadingRegister && 
                              <Button type="submit" shadow color="primary" auto disabled={loadingRegister}>
                                Criar
                              </Button>
                            }
                            {loadingRegister && 
                              <Spinner />
                            }
                          </div>
                          <Divider className="my-4" />
                        </form>
                      }
                      <TableTipoSocios edit={(dt) => editType(dt)} />
                      <ModalFooter>
                          <Button color="danger" variant="flat" onPress={() => closeModal(modalName)}>
                            Fechar
                          </Button>
                          
                        </ModalFooter>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
              </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminTools;
