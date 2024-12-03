const handleTableHeaders = (values) => {
  if (values.length === 0) {
    return [];
  }

  const firstRow = values[0];
  const keys = Object.keys(firstRow);

  const columns = keys.map(key => ({
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    field: key,
    resizable: true,
    minWidth: 200,
    filter: true
  }));

  return columns;
};


const handlePicker = (values) => {
  let array = [];

  for(let i = 0; i < values.length; i++) {
    array.push({
      value: values[i].PAYEEID,
      label: values[i].Name
    })
  }

  return array;
};

const handlePickerSfid = (values) => {
  let array = [];

  for(let i = 0; i < values.length; i++) {
    array.push({
      value: values[i].sfid,
      label: values[i].sfid
    })
  }

  return array;
};


const prepareSFIDTable = (payee, values) => {

  console.log("values")
  console.log(values)
  let pvpositionUNE = values.pvpositionUNE ? values.pvpositionUNE : '';
  let pvpositionUNP = values.pvpositionUNP ? values.pvpositionUNP : '';

  let objs = [];

  let obj = {
    payeeID: payee,
    username: values.pvuserid,
    ppvUser: values.pvPPVUser,
    sapAccount: values.pvsapaccount,
    name: values.pvfirstname, 
    nif: values.pvtaxid, 
    address: values.pvpostaladdress1,
    email: values.pvemailaddress,
    startDate: values.pdhiredate.split("T")[0],
    endDate: values.pdendofcontract.split("T")[0],
  };


  objs.push(obj)

  const keys = Object.keys(obj);

  const columns = keys.map(key => ({
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    field: key,
    maxWidth: 200,
  }));

  let objsNew = [];

  let objNew = {
    "UNE Vendas PRTII": values.pPRTUNE, 
    "Bloqueado": values.pnblockPRTUNE == 0 ? 'Não' : 'Sim',
    "UNP Vendas PRTII": values.pnPRTUNP,
    "Bloqueado": values.pnblockPRTUNP == 0 ? "Não" : "Sim",
    "UNE Vendas NOTPRTII": values.pnNOTPRTUNE,
    "Bloqueado": values.pnblockNOTPRTUNE == 0 ? "Não" : 'Sim',
    "UNP Vendas NOTPRTII": values.pnNOTPRTUNP,
    "Bloqueado": values.pnblockNOTPRTUNP == 0 ? "Não" : 'Sim',
    "Office Agregador UNE": values.pvOfficeAggUNE,
    "Office Agregador UNP": values.pv0fficeAggUNP,
    "Tipo de Posição": "Pre-Assigned",
    "Valor de Posição": "Pre-Assigned",
    "Fim de Contrato": values.pdendofcontract.split("T")[0],
    "Participant ID Master": values.pvPayeeIDMaster,
    "Payee ID": payee,
    "UNE Vendas PRTII": values.pvPayeeIDMaster
  }


  objsNew.push(objNew)

  return {pvpositionUNE, pvpositionUNP, objs, columns, objsNew};
};


const preparepvpositionUNE= (values) => {

  let aa = []
  let objNew = {
    "Nome da Posição UNE: ": values.Name,
    "Title UNE:": values.Title,
    "Manager UNE:": values.SalesManager,
    "Fim de Contrato UNE:": values.FimContrato.split("T")[0],
    "Roll End Date UNE:": values.RollEndDate.split("T")[0],
    "Process End Date UNE:": values.ProcessEndDate.split("T")[0]
  }

  aa.push(objNew)

  return aa;
}

const preparepvpositionUNP= (values) => {

  let bb = []
  let objNew = {
    "Nome da Posição UNP: ": values.Name,
    "Title UNP:": values.Title,
    "Manager UNP:": values.SalesManager,
    "Fim de Contrato UNP:": values.FimContrato.split("T")[0],
    "Roll End Date UNP:": values.RollEndDate.split("T")[0],
    "Process End Date UNP:": values.ProcessEndDate.split("T")[0]
  }

  bb.push(objNew)

  return bb;
}

export default { handleTableHeaders, handlePicker, prepareSFIDTable, preparepvpositionUNE, preparepvpositionUNP, handlePickerSfid };