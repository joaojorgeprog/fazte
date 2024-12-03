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
	setClearEditTipo,
  selectLoadingEditTipo,
  selectSuccessEditTipo,
  fetchEditTipo
  } from '../../../../../slices/associates';

const AssociateType = ({ modalName, typeData }) => {
  const { isModalOpen, closeModal, modalStack } = useModal();

  if (!isModalOpen(modalName)) return null;
  
  const router = useRouter();
  const [error, setError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const dispatch = useDispatch();

  let loadingEditTipo = useSelector(selectLoadingEditTipo);
  let successEditTipo = useSelector(selectSuccessEditTipo);

  useEffect(() => {
    alert("dentro")
    dispatch(setClearEditTipo())
  }, [])


  useEffect(() => {
    if (sendRequest && successEditTipo) {
      closeModal(modalName)
    }
  }, [sendRequest, successEditTipo]);

  const formik = useFormik({
    initialValues: {
      name: typeData.name,
      valor: parseInt(typeData.valor)
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Email é obrigatório"),
      valor: Yup.number().required("Valor é obrigatório")
    }),
    onSubmit: async (values) => {
      try {
        let send = {
          valor: parseInt(values.valor),
          name: values.name,
          id: typeData.id
        }
        setSendRequest(true)
        dispatch(fetchEditTipo(send))

      } catch (error) {
        console.log("aqui erro catch")
        console.log(error.message)
        setError(error.message);
        //onLoginSuccess(false);
        toast.error("Error try edit")
      }
    },
  });


  const zIndex = 1000 + modalStack.indexOf(modalName);


  return (
    <>
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
              <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
              <ModalBody>
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
                  type="number"
                  label="Valor"
                  name="valor"
                  placeholder="0.00"
                  labelPlacement="outside"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.valor}
                  helperText={formik.touched.valor && formik.errors.valor ? formik.errors.valor : ""}
                  status={formik.touched.valor && formik.errors.valor ? "error" : "default"}
                  isInvalid={formik.touched.valor && formik.errors.valor ? true : false}
                  errorMessage={formik.touched.valor && formik.errors.valor ? formik.errors.valor : ""}
                  
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
                  Fechar
                </Button>
                {!loadingEditTipo && 
                  <Button type="submit" shadow color="primary" auto disabled={loadingEditTipo}>
                    Confirmar
                  </Button>
                }
                {loadingEditTipo && 
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

export default AssociateType;
