import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination
} from "@nextui-org/react";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { useSelector, useDispatch } from 'react-redux';

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

import {
  selectAssociates,
  selectErrorGetAssociates,
  selectLoadingAssociates,
  fetchAssociates,
  selectAssociatesHeaders,
} from '../../../../slices/associates';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssociates());
  }, [dispatch]);

  const users = useSelector(selectAssociates) || [];
  const columns = useSelector(selectAssociatesHeaders) || [];

  const loadingAssociates = useSelector(selectLoadingAssociates);
  const errorGetAssociates = useSelector(selectErrorGetAssociates);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    if(items)  {
      console.log("items")
      console.log(items)
    }
  }, [items])

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey] || "";

    switch (columnKey) {
      case "delayedPayment":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue] || "default"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
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

  if (!columns.length || !users.length) {
    return <p>Loading data...</p>;
  }

  return (
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
    <TableRow key={item.associateNumber || item.nif || Math.random()}>
      {(columnKey) => (
        <TableCell>
          {renderCell(item, columnKey)} {/* Aqui deve ser columnKey e não column.uid */}
        </TableCell>
      )}
    </TableRow>
  )}
</TableBody>
    </Table>
  );
}
