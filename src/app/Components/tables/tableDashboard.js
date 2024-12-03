import React, { useEffect, useCallback } from "react";
import {Tooltip,Dropdown, User, Chip, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input,Select, SelectItem , Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import useSWR from "swr";
import axiosInstance from '../../../../axiosConfig';
import {PlusIcon} from "../../icons/PlusIcon";
import {VerticalDotsIcon} from "../../icons/VerticalDotsIcon";
import {SearchIcon} from "../../icons/SearchIcon";
import {ChevronDownIcon} from "../../icons/ChevronDownIcon";
import {columns, users, statusOptions} from "./data";
import {capitalize} from "./utils";
import { useSelector, useDispatch } from 'react-redux';
import TextInput from '../../Components/inputs/textInput'
import MultiSelect from '../../Components/select/mutiSelect'
import SingleSelectAutoComplete from '../../Components/select/singleSelectAutoComplete'
import {EyeIcon} from "../../icons/EyeIcon";
import {EditIcon} from "../../icons/EditIcon";
import {DeleteIcon} from "../../icons/DeleteIcon";
import EditAssociate from '../Modals/editAssociate/page';
import InDebt from '../Modals/inDebt/page';
import { useModal } from '../../Provider';
import ModalComponent from '../Modals/ModalComponent/page';


import {
  fetchFilters,
  selectSeasons,
  selectStatus,
  selectAssociatesNumber,
  selectErrorGetFilters,
  selectLoadingFilters,
  fetchDebt
} from '../../../../slices/associates';

const fetcher = async (url, filtersSend) => {
  const response = await axiosInstance.post(
    url,
    filtersSend, // Envia filtersSend como body
    {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
};

const initialFilter = {
  name: "",
  nif: "",
  seasons: [],
  status: [],
  associatesId: []
}

const statusColorMap = {
  valido: "success",
  incumprimento: "danger",
  vacation: "warning",
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function App() {
  const { openModal, isModalOpen,closeModal } = useModal();
  const dispatch = useDispatch();
  const [firstLoading, setFirstLoading] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");
  const [filterNIF, setFilterNIF] = React.useState("");
  const [filtersSend, setFiltersSend] = React.useState(initialFilter)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [selectedData, setSelectedData] = React.useState(null);

  const { data, isLoading } = useSWR(
    [`/admin/associates/getAssociates?page=${page}`, filtersSend],
    ([url, filtersSend]) => fetcher(url, filtersSend),
    { keepPreviousData: true }
  );

  const pages = React.useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const loadingState = isLoading || data?.data.length === 0 ? "idle" : "idle";

  const applyFilters = useCallback(
    debounce((isNif) => {
      // Atualiza o filtro quando a debouncing termina
      setFiltersSend((prev) => ({
        ...prev,
        [isNif ? "nif" : "name"]: isNif ? filterNIF : filterValue,
      }));
      setPage(1); // Reseta a página para 1 ao aplicar filtros
    }, 1000), // 500ms de debounce
    [filterNIF, filterValue] // Dependências para o useCallback
  );

  const onSearchChange = (value) => {
    setFilterValue(value);
    if (value.length > 3) {
      applyFilters(false); // Chama a função de debounce
    } else {
      // Se o valor não é maior que 3, reseta o filtro
      setFiltersSend((prev) => ({ ...prev, name: "" }));
    }
  };

  const onSearchChangeNIF = (value) => {
    setFilterNIF(value);
    if (value.length === 9) {
      applyFilters(true); // Chama a função de debounce
    } else {
      // Se o valor não tem 9 caracteres, reseta o filtro
      setFiltersSend((prev) => ({ ...prev, nif: "" }));
    }
  };

  useEffect(() => {
    console.log("pppppp")
    dispatch(fetchFilters())
  }, [])

  const needUseFilters = (isNif) => {
    if (isNif) {
      setFiltersSend(prevFilters => ({
        ...prevFilters,           // Mantém os valores anteriores
        nif: filterNIF           // Atualiza o NIF com o novo valor
      }));
    } else {
      setFiltersSend(prevFilters => ({
        ...prevFilters,           // Mantém os valores anteriores
        name: filterValue        // Atualiza o nome com o novo valor
      }));
    }
  }

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
  
    if (
      typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null
    ) {
      return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false;
  
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }

  const buttonSearch = () => {
    if(!deepEqual(filtersSend,initialFilter)) {
      console.log("preciso filtrar")
      needUseFilters()
    }
  } 

  const updateSeason = (seas) => {
    setFiltersSend(prevState => ({
      ...prevState,
      seasons: Array.from(seas)
    }))
  }
  
          
  let seasons = useSelector(selectSeasons);
  let status = useSelector(selectStatus);
  let associatesNumber = useSelector(selectAssociatesNumber);

  let errorGetFilters = useSelector(selectErrorGetFilters);
  let loadingFilters = useSelector(selectLoadingFilters);


  function clickEdit(data) {
    setSelectedData(data)
    openModal('editAssociateModal')
  }

  function clickDebt(data) {
    setSelectedData(data)
    dispatch(fetchDebt())
    openModal('inDebtModal')
  }

  function clickDelete(data) {
    setSelectedData(data)
    openModal('deleteAssociteModal')
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fullName":
        return (
          <User
            avatarProps={{radius: "lg", src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}}
            description={cellValue}
            name={cellValue}
          >
            {cellValue}
          </User>
        );
      case "delayedPayment":
        return (
          <Button color={statusColorMap[user.delayedPayment.toLowerCase()]}  variant="bordered" isDisabled={true}>
            <Chip 
              className="capitalize border-none gap-1 text-default-600" 
              color={statusColorMap[user.delayedPayment.toLowerCase()]} 
              size="sm" 
              variant="dot">
              {cellValue}
            </Chip>
          </Button>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => clickDebt(user)}/>
              </span>
            </Tooltip>
            <Tooltip content="Edit user" >
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => clickEdit(user)}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => clickDelete(user)}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);



  useEffect(() => {
    if(loadingFilters){
      setFirstLoading(false)
    }
  }, [loadingFilters])


  if(data && data == null) {
    return <p>Internal Error</p>;
  }

  if (loadingFilters) {
    return <p>Loading data...</p>;
  }

  if (errorGetFilters || errorGetFilters != null) {
    return <p>{errorGetFilters}</p>;
  }

  if (!data?.data.length || !data?.columns.length) {
    return <p>Loading data...</p>;
  }

  if(data?.columns.length == 0 && data?.data.length > 0) {
    return <p>Internal Error</p>;
  }

  //if (isLoading && firstLoading) return <div>Loading...</div>;


  return (
    <>
      <EditAssociate modalName={"editAssociateModal"} data={selectedData} />
      <InDebt modalName={"inDebtModal"} data={selectedData} />
      <ModalComponent 
        modalName="deleteAssociteModal"
        text={"Apagar Associado com id"} 
        header={"Apagar Associado"}
        optionA={() => closeModal('deleteAssociteModal')} 
        optionB={() => openMcloseModalodal('deleteAssociteModal')} 
        optionTextA={"Cancel"} 
        optionTextB={"Delete"} 
      >
      </ModalComponent>

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-3">
        <TextInput 
          label={"Nome"} 
          isClearable={true}
          size={"sm"}
          value={filterValue}
          variant={"bordered"}
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
          
        />
        
        <TextInput 
          label={"Nif"} 
          isClearable={true}
          size={"sm"}
          value={filterNIF}
          variant={"bordered"}
          onClear={() => setFilterNIF("")}
          onValueChange={onSearchChangeNIF}
          
        />

        <MultiSelect 
          label={"Anos"} 
          placeholder={""}
          selectedKeys={filtersSend.seasons}
          className={"w-full md:w-1/2"}
          onSelectionChange={(seas) => updateSeason(seas)}
          size={"sm"} 
          isLoading={loadingFilters && errorGetFilters ==  null && seasons}
          options={seasons}
        />

        <MultiSelect 
          label={"Estados"} 
          placeholder={""}
          selectedKeys={filtersSend.status}
          className={"w-full md:w-1/2"}
          onSelectionChange={(sta) => setFiltersSend(prevState => ({
                ...prevState,
                status: Array.from(sta)
              }))}
          size={"sm"} 
          isLoading={loadingFilters && errorGetFilters ==  null && status}
          options={status}
        />

        <SingleSelectAutoComplete 
          label={"Nº Socio"} 
          placeholder={""}
          selectedKeys={filtersSend.associatesId}
          className={"w-full md:w-1/2"}
          onSelectionChange={(assn) => setFiltersSend(prevState => ({
                ...prevState,
                associatesId: Array.from(assn)
              }))}
          size={"sm"} 
          isLoading={loadingFilters && errorGetFilters ==  null && associatesNumber}
          options={associatesNumber}
        />
            

            {false &&
              <Button color="foreground" onClick={() =>buttonSearch()}>
                Search
              </Button>
            }

            <div>

            </div>

      </div> 
      <Table
        isCompact
        color={"default"}
        selectionMode="multiple"
        aria-label="Table Dashboad"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        bottomContent={
          pages > 0 ? (
            <div className="py-2 px-2 flex justify-between items-center">
              <span className="w-[30%] text-small text-default-400">
                {selectedKeys === "all"
                  ? "All items selected"
                  : `${selectedKeys.size} of ${data?.count} selected`}
              </span>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
              <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
              </Button>
            </div>
            </div>
          ) : null
        }
      >
        <TableHeader columns={data?.columns ?? []}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid == "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item, index) => (
            <TableRow key={item?.associateNumber || index} >
              {(columnKey) => <TableCell >{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
