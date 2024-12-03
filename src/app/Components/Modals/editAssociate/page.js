'use client'; // Necessário para componentes interativos

import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Alterado para next/navigation
import {DatePicker, RadioGroup, Radio, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useModal } from '../../../Provider';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {startOfWeek, startOfMonth, getLocalTimeZone, today} from "@internationalized/date";

import {
	fetchEditAssociate,
  selectLoadingEdit,
  selectSucessEdit,
  selectErrorEdit
  } from '../../../../../slices/associates';

const Edit = ({ modalName, onRegisterSuccess, data }) => {
  if(!data) {
    return null;
  }
  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const { closeModal, isModalOpen, modalStack } = useModal();
  const dispatch = useDispatch();

  let loadingEdit = useSelector(selectLoadingEdit);

  let haveSucessEdit = useSelector(selectSucessEdit);


  useEffect(() => {
    //handler do login
    if(haveSucessEdit && sendRequest) {
      //onRegisterSuccess(true);
      closeModal(modalName)
      //router.push('/'); // Direciona para o dashboard após o login
      setSendRequest(false);
    }else if(!haveSucessEdit && sendRequest) {
      //onRegisterSuccess(false);
      setSendRequest(false);
    }
  }, [haveSucessEdit])

  let errorEdit = useSelector(selectErrorEdit);

  useEffect(() => {
    //handler do erro de login
    if(errorEdit) {
      setError(errorEdit)
    }
  }, [errorEdit])

  const formik = useFormik({
    initialValues: {
      email: data.email,
      name: data.name,
      address: data.address,
      nif: data.nif,
      phoneNumber: data.phoneNumber,
      associateNumber: data.associateNumber,
      gener: data.gener,
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
    .matches(/^\d+$/, 'Conter apenas números'),
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
          dispatch(fetchEditAssociate(send))
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


  if (!isModalOpen(modalName)) return null;

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
          zIndex: zIndex
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Editar Socio</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">
                    <Input
                      autoFocus
                      label="Nº Socio"
                      name="associateNumber"
                      type="number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.associateNumber}
                      helperText={formik.touched.associateNumber && formik.errors.associateNumber ? formik.errors.associateNumber : ""}
                      status={formik.touched.associateNumber && formik.errors.associateNumber ? "error" : "default"}
                      isInvalid={formik.touched.associateNumber && formik.errors.associateNumber ? true : false}
                      errorMessage={formik.touched.associateNumber && formik.errors.associateNumber ? formik.errors.associateNumber : ""}
                      variant="bordered"
                    />
                  </div>
                  <div className="col-span-8">
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
                  </div>
                </div>

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
                    />
                  </div>
                  <div className="col-span-6">
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
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
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
                  </div>
                  <div className="col-span-6">
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
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                    <DatePicker
                      isRequired
                      label="Data Nascimento"
                      variant="bordered"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="dataNascimento"
                      value={formik.values.dataNascimento}
                      helperText={formik.touched.dataNascimento && formik.errors.dataNascimento ? formik.errors.dataNascimento : ""}
                      status={formik.touched.dataNascimento && formik.errors.dataNascimento ? "error" : "default"}
                      isInvalid={formik.touched.dataNascimento && formik.errors.dataNascimento ? true : false}
                      errorMessage={formik.touched.dataNascimento && formik.errors.dataNascimento ? formik.errors.dataNascimento : ""}
                      showMonthAndYearPickers
                      className='mb-10'
                    />
                  </div>
                  <div className="col-span-6">
                    <RadioGroup
                      autoFocus
                      label="Tipo Socio"
                      name="genero"
                      defaultValue="efetivo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.genero}
                      helperText={formik.touched.genero && formik.errors.genero ? formik.errors.genero : ""}
                      status={formik.touched.genero && formik.errors.genero ? "error" : "default"}
                      isInvalid={formik.touched.genero && formik.errors.genero ? true : false}
                      errorMessage={formik.touched.genero && formik.errors.genero ? formik.errors.genero : ""}
                    >
                      <Radio value="crianca">Criança (até 18)</Radio>
                      <Radio value="senior">Sénior</Radio>
                      <Radio value="efetivo">Efetivo</Radio>
                      <Radio value="especial">Especial</Radio>
                    </RadioGroup>
                  </div>
                  
                </div>

                {error && (
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <p color="error" style={{"color": "red"}}>{error}</p>
                    </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={() => closeModal(modalName)}>
                  Cancelar
                </Button>
                {!loadingEdit && 
                  <Button type="submit" shadow color="primary" auto disabled={loadingEdit}>
                    Editar
                  </Button>
                }
                {loadingEdit && 
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

export default Edit;