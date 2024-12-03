import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { useSelector, useDispatch } from 'react-redux';

import TipoAssociateModal from '../Modals/tipoAssociateModal/page';

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

import {
  selectTipoSocios,
  selectLoadingTiposSocios,
  selectErrorGetTiposSocios,
  fetchTipoSocios,
  selectHeadersTipoSocios,
} from '../../../../slices/associates';

export default function App({edit}) {
  const dispatch = useDispatch();
  const [season, setSeason] =React.useState("2024")

  useEffect(() => {
    dispatch(fetchTipoSocios());
  }, [dispatch]);

  let users = useSelector(selectTipoSocios) || [];
  let loadingTiposSocios = useSelector(selectLoadingTiposSocios);
  let errorGetTiposSocios = useSelector(selectErrorGetTiposSocios);
  let columns = useSelector(selectHeadersTipoSocios) || [];

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const editType = (dat) => {
    console.log("estou aqui")
    edit(dat)
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey] || "";

    switch (columnKey) {
      case "valor":
        return (
            <p className="text-bold text-sm capitalize">{cellValue} €</p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => editType(user)}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // Renderiza a tabela apenas se columns e users estiverem definidos
  if (!columns.length || !users.length) {
    return <p>Loading data...</p>;
  }

  return (
    <>
        <RadioGroup
            autoFocus
            label="Season"
            defaultValue="2024"
            onChange={(sea) => setSeason()}
            value={season}
            orientation="horizontal"
        >
            <Radio value="2024">2024</Radio>
            <Radio value="2023">2023</Radio>
            <Radio value="2022">2022</Radio>
            <Radio value="2021">2021</Radio>
            <Radio value="2020">2020</Radio>
            <Radio value="2019">2019</Radio>
            <Radio value="2018">2018</Radio>
            <Radio value="2017">2017</Radio>
            <Radio value="2016">2016</Radio>
            <Radio value="2015">2015</Radio>
        </RadioGroup>
        <Table 
            aria-label="Example table with custom cells"
            bottomContent={
                <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
                </div>
        }
        >

        <TableHeader columns={columns}>
            {(column) => (
            <TableColumn key={column.uid || column.name} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
            </TableColumn>
            )}
        </TableHeader>
        <TableBody items={items}>
            {(item) => (
            <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            )}
        </TableBody>
        </Table>
    </>
  );
}
