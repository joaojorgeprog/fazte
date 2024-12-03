'use client'; // Necessário para componentes interativos

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableDashboard from '../Components/tables/tableDashboard'
import TableDashboardActives from '../Components/tables/tableDashboardActives'
import {Tabs, Tab, Card, CardBody, CardHeader, Button} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import RegisterAssociate from '../Components/Modals/registerAssociate/page';
import AdminTools from '../Components/Modals/adminTools/page';
import TipoAssociateModal from '../Components/Modals/tipoAssociateModal/page';
import { useModal } from '../Provider';
import { useSearchParams } from 'next/navigation';
import TableTeste from '../Components/tables/tableTeste'
import MembershipCard from '../Components/cardV2/card'

import ModalComponent from '../Components/Modals/ModalComponent/page';
import AssociatesStatistics from '../Components/AssociatesStatistics/index'
import TitlePage from '../Components/TitlePage/index';
import { FaNotesMedical } from "react-icons/fa6";
import { MdOutlinePlaylistAddCircle } from "react-icons/md";


const Dashboard = () => {
  const { openModal, isModalOpen,closeModal } = useModal();
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false)

  const searchParams = useSearchParams();
  const [hasRunEffect, setHasRunEffect] = useState(0);
  const [editTypeData, setEditTypeData] = useState({});

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setHasRunEffect(hasRunEffect + 1)
      console.log(`Código encontrado: ${code}`);
    }
  }, [searchParams]);


  const editType = (dat) => {
    alert("aqui aaasasas")
    setEditTypeData(dat)
    openModal('tipoAssociateModal')
  }

  return (
    <div className="container mt-10">
      
      <AssociatesStatistics />
      <TitlePage title={"Socios"}/>
      {true ? (
          <>
            <Tabs aria-label="Disabled Options" className="w-full"
            variant="underlined"
            placement="block" 
            hideDivider>
                <Tab key="photos" title="Ativos">
                  <Card>
                    <CardBody>
                        <TableDashboardActives />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="music" title="Em Desenvolvimento">
                  <Card>
                    <CardBody>
                        <button onClick={() => openModal('modal1')}>Abrir Modal 1</button>
                        <ModalComponent 
                          modalName="modal1"
                          text={"Conteúdo da Modal 1"} 
                          header={"Header Modal 1"}
                          optionA={() => closeModal('modal1')} 
                          optionB={() => openModal('modal2')} 
                          optionTextA={"Cancel"} 
                          optionTextB={"Abrir Modal 2"} 
                          >
                          <p>Conteúdo da Modal 1</p>
                          <button onClick={() => openModal('modal2')}>Abrir Modal 2</button>
                        </ModalComponent>

                        <ModalComponent modalName="modal2">
                          Conteúdo da Modal 2
                          {/* Esta segunda modal pode ser fechada, e a primeira modal continuará visível */}
                        </ModalComponent>
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="Todos" title="Todos">
                  <Card>
                    <CardBody>
                      <div className='mb-5'>
                        <div className="flex" style={{justifyContent: 'space-between'}}>
                          <MdOutlinePlaylistAddCircle style={{cursor: 'pointer'}} size={32} onClick={() => openModal('adminToolsModal')}/>
                          <FaNotesMedical size={28} style={{cursor: 'pointer'}} onClick={() => openModal('registerAssociateModal')}/>
                        </div>
                        <div>
                          
                        </div>
                      </div>
                       <RegisterAssociate modalName={"registerAssociateModal"} />
                       <AdminTools modalName={"adminToolsModal"} selectedValue={"season"} edit={(dt) => editType(dt)} />
                       <TipoAssociateModal modalName={"tipoAssociateModal"} typeData={editTypeData} />
                        
                        <TableDashboard />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="meuClube" title="Meu Clube">
                  <Card>
                    <CardBody>
                      <TableDashboard />
                      <TableTeste />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="cartao" title="Cartões">
                  <Card>
                    <CardBody>
                      <h1>Design Card</h1>
                      <MembershipCard bgColor="#f0f0f0" />
                    </CardBody>
                  </Card>  
                </Tab>
              </Tabs>
          </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Dashboard;
