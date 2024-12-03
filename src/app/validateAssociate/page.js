// src/app/open-modal-page.js
'use client';

import React, {useState, useEffect} from 'react';
import { useModal } from '../Provider';
import AllowModal from '../Components/Modals/allowModal/page'; // Ajuste o caminho conforme necessário
import { Scanner } from '@yudiel/react-qr-scanner';
import {CheckCircle} from "../icons/CheckCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import {startOfWeek, startOfMonth, getLocalTimeZone, today} from "@internationalized/date";
import {CameraIcon} from "../icons/CameraIcon";
import {DeleteIcon} from "../icons/DeleteIcon";


import {Skeleton, DatePicker, Divider,Image, Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, CardFooter} from "@nextui-org/react";

import {
	fetchLogin,
  selectLoadingLogin,
  selectHavelogin,
  selectErrorLogin,
  setClearAll
  } from '../../../slices/auth';

import { useSelector, useDispatch } from 'react-redux';


const OpenModalPage = () => {
  const dispatch = useDispatch();
  const { openModal, isModalOpen } = useModal();
  const [message, setMessage] = useState('');
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showQRReader, setShowQRReader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selected, setSelected] = React.useState("QRCode");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const permissions = await navigator.permissions.query({ name: 'camera' });
        console.log("permissions")
        console.log(permissions)

        if (permissions.state === 'granted') {
          console.log("aqui joao a tentar abrir 1")
          setHasCameraPermission(true);
        } else if (permissions.state === 'denied') {
          setPermissionDenied(true);
          openModal('allowModal')
          console.log("aqui joao a tentar abrir")
        } else {
          console.log("aqui joao a tentar abrir 2")
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (stream) {
            setHasCameraPermission(true);
            stream.getTracks().forEach(track => track.stop()); // Fecha a câmera após conceder permissão
          }
        }
      } catch (error) {
        console.error('Erro ao obter permissão para câmera:', error);
        setPermissionDenied(true);
        openModal('allowModal')
      }
    };

    checkCameraPermission();
  }, []);

  const onPermissionGranted = () => {
    setHasCameraPermission(true)
  } 

  const handleScan = (data) => {
    console.log("data")
    console.log(data)
    if (data && data[0].rawValue !== "") {
      let resultado = JSON.parse(data[0].rawValue)
      setQrCodeData(resultado);
      setShowQRReader(false)
      setIsLoaded(true)
    }
  };

  const scannerWidth = windowWidth < 768 ? '100%' : '25%'; 

  const confrimEntrance = (data) => {
    console.log("entrada confirmada")
    console.log(data)
  };

  const formik = useFormik({
    initialValues: {
      socioNumber: "",
      dataNascimento: today(getLocalTimeZone())
    },
    validationSchema: Yup.object({
      socioNumber: Yup.string().required("Número de sócio é obrigatório"),
      dataNascimento: Yup.date().required("Data nascimento é obrigatória")
    }),
    onSubmit: async (values) => {
      try {
        let send = {
          "associateNumber": parseInt(values.socioNumber),
          "dataNascimento": values.dataNascimento
        }
        setSendRequest(true)
        dispatch(fetchLogin(send))
      } catch (error) {
        console.log("aqui erro catch")
        console.log(error.message)
        setError(error.message);
        //onLoginSuccess(false);
        toast.error("Error login, try again")
      }
    },
  });

  return (
      <div className="container mt-10">
        <div className="flex flex-col items-center w-full">
          <Card className="max-w-full min-w-[70%] items-center">
            <CardBody className="overflow-hidden gap-4">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
                className='max-w-full items-center flex flex-col'
              >
                <Tab key="QRCode" title="QRCode" className='max-w-full items-center flex flex-col' >
                  {hasCameraPermission && !showQRReader &&
                    <Button className='mb-5' onPress={() => {setQrCodeData(null), setShowQRReader(true)}} startContent={<CameraIcon/>} >Ler QRCode</Button>
                  }
                  {hasCameraPermission && showQRReader &&
                    <Button startContent={<DeleteIcon />} color="danger" className='mb-5' onPress={() => {setQrCodeData(null), setShowQRReader(false)}}>Cancelar</Button>
                  }
                  {hasCameraPermission && showQRReader && 
                    <div style={{width: scannerWidth}} className='mb-5'>
                      <Scanner 
                        onScan={handleScan}
                        
                      />
                    </div>
                  }
                  {!hasCameraPermission &&
                    <p>Solicitando permissão para a câmera...</p>
                  }
                  {qrCodeData &&
                    <Card style={{ backgroundColor: '#ccffcc', color: 'black' }} className='max-w-full flex flex-col'>
                      <CardHeader className="flex gap-3">
                          <CheckCircle />
                        <div className="flex flex-col">
                          <p className="text-md">Valido</p>
                        </div>
                      </CardHeader>
                      <Divider/>
                      <CardBody>
                        <p>O usuario é socio com cotas em dias</p>
                      </CardBody>
                      <Divider/>
                      <CardFooter>
                      <Button style={{ backgroundColor: 'green' }}onPress={() => confrimEntrance(true)}>Confirmar entrada</Button>
                      </CardFooter>
                    </Card>
                  }
                  {qrCodeData && 
                  <>
                    <Skeleton isLoaded={isLoadedInfo} className="rounded-lg">
                      <Input
                        type="text"
                        label="Estado"
                        defaultValue="Valido"
                        isReadOnly={true}
                        description="Valido pode entrar, invalido não pode"
                        className="mt-5"
                      />
                    </Skeleton>
                    <Skeleton isLoaded={isLoadedInfo} className="rounded-lg">
                    <Input
                      type="text"
                      label="Nome"
                      defaultValue={qrCodeData?.name}
                      isReadOnly={true}
                      className="mb-5"
                    />
                    </Skeleton>
                    <Skeleton isLoaded={isLoadedInfo} className="rounded-lg">
                    <Input
                      type="text"
                      label="Nª Socio"
                      defaultValue="João Jorge"
                      isReadOnly={true}
                      className="mb-5"
                    />
                    </Skeleton>
                    <Skeleton isLoaded={isLoadedInfo} className="rounded-lg">
                    <Input
                      type="text"
                      label="Data de Nascimento"
                      defaultValue="01-10-2024"
                      isReadOnly={true}
                      description="Dia-Mês-Ano"
                    />
                    </Skeleton>
                  </>
                }
                </Tab>
                <Tab key="byId" title="Por Numero de Socio">
                  <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
                    />

                    <Input
                      autoFocus
                      type="number"
                      label="Nº Socio"
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
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Validar
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {message && <p>{message}</p>}
        {false && <Button onPress={() => openModal('allowModal')}>Abrir Modal</Button>}
          {isModalOpen('allowModal') && <AllowModal modalName={"allowModal"} onPermissionGranted={() => onPermissionGranted()}/>}
      </div>
  );
};

export default OpenModalPage;