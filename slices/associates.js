import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axiosConfig';
import utils from './utils';
import { toast } from 'react-toastify';


const {handleTableHeaders, handlePicker, prepareSFIDTable, preparepvpositionUNE, preparepvpositionUNP} = utils;

const initialState = {
  loadingAssociates: false,
  errorGetAssociates: null,
  associates: [],
  headers: [],
  statusOptions: [],
  seasons: [],
  status: [],
  associatesNumber: [],

  loadingTiposSocios: false,
  errorGetTiposSocios: null,
  tiposSocios: [],
  headersTiposSocios: [],

  loadingEditTipo: false,
  successEditTipo: false,

  loadingEdit: false,
  sucessEdit: false,
  errorEdit: null,

  loadingDebt: false,
  debt: [],
  debtTotal: [],
  errorDebt: null
};

const associatesSlice = createSlice({
  name: 'associates',
  initialState,
  reducers: {
    setDebtTotal(state, action){
      state.debtTotal = action.payload;
    },
    setDebt(state, action){
      state.debt = action.payload;
      state.loadingDebt = false;
      state.errorDebt = false
    },

    setLoadingDebt(state, action){
      state.loadingDebt = action.payload;
    },

    setErrorDebt(state, action){
      state.errorDebt = false;
      state.debt = [];
      state.errorDebt = action.payload;
    },

    setLoadingEdit(state, action){
      state.loadingEdit = action.payload;
    },
  
    setErrorEdit(state, action){
      state.loadingEdit = false;
      state.sucessEdit = false;
      state.errorEdit = action.payload;
    },
  
    setSucessEdit(state, action){
      state.loadingEdit = false;
      state.sucessEdit = true;
      state.errorEdit = null;
    },

    setClearEditTipo(state, action){
      state.loadingEditTipo = false
      state.successEditTipo = false;
    },
    setSuccessEditTipo(state, action){
      state.loadingEditTipo = false
      state.successEditTipo = true;
    },
    setLoadingEditTipo(state, action){
      state.loadingEditTipo = action.payload;
    },
    setTipoSocios(state, action){
      state.loadingTiposSocios = false
      state.errorGetTiposSocios = null
      state.tiposSocios = action.payload.data;
      state.headersTiposSocios = action.payload.headers;
    },
    setLoadingTiposSocios(state, action){
      state.loadingTiposSocios = action.payload;
    },
    setErrorGetTiposSocios(state, action){
      state.errorGetTiposSocios = action.payload;
      state.headersTiposSocios = []
      state.tiposSocios = []
    },
    setAssociates(state, action){
      state.associates = action.payload.data;
      state.headers = action.payload.headers;
      state.statusOptions = action.payload.statusOptions;
      state.loadingAssociates = false
      state.errorGetAssociates = null
    },
    setLoadingAssociates(state, action){
      state.loadingAssociates = action.payload;
    },
    setErrorGetAssociates(state, action){
      state.errorGetAssociates = action.payload;
    },

    setLoadingFilters(state, action){
      state.loadingFilters = action.payload;
    },

    setFilters(state, action){
      state.seasons = action.payload.seasons;
      state.status = action.payload.status;
      state.associatesNumber = action.payload.associatesNumber;
    },

    setErrorGetFilters(state, action){
      state.errorGetFilters = action.payload;
    },

    setClearAll() {
      return initialState;
    },

  },
  
});

// Action creators are generated for each case reducer function
const { 
  setAssociates,
  setLoadingAssociates,
  setErrorGetAssociates,
  setClearAll,
  setLoadingFilters,
  setFilters,
  setErrorGetFilters,
  setTipoSocios,
  setLoadingTiposSocios,
  setErrorGetTiposSocios,
  setSuccessEditTipo,
  setLoadingEditTipo,
  setClearEditTipo,
  setLoadingEdit,
  setErrorEdit,
  setSucessEdit,
  setDebt,
  setLoadingDebt,
  setErrorDebt,
  setDebtTotal
} = associatesSlice.actions;

const selectSeasons = (state) => state.associates.seasons;
const selectStatus = (state) => state.associates.status;
const selectAssociatesNumber = (state) => state.associates.associatesNumber;

const selectErrorGetFilters = (state) => state.associates.errorGetFilters;
const selectLoadingFilters = (state) => state.associates.loadingFilters;

const selectAssociates = (state) => state.associates.associates;
const selectErrorGetAssociates = (state) => state.associates.errorGetAssociates;
const selectLoadingAssociates = (state) => state.associates.loadingAssociates;
const selectAssociatesHeaders = (state) => state.associates.headers;
const selectAssociatesStatusOptions = (state) => state.associates.statusOptions;

const selectTipoSocios = (state) => state.associates.tiposSocios;
const selectHeadersTipoSocios = (state) => state.associates.headersTiposSocios;
const selectLoadingTiposSocios = (state) => state.associates.loadingTiposSocios;
const selectErrorGetTiposSocios = (state) => state.associates.errorGetTiposSocios;

const selectLoadingEditTipo = (state) => state.associates.loadingEditTipo;
const selectSuccessEditTipo = (state) => state.associates.successEditTipo;


const selectLoadingEdit = (state) => state.associates.loadingEdit;
const selectSucessEdit = (state) => state.associates.sucessEdit;
const selectErrorEdit = (state) => state.associates.errorEdit;

const selectLoadingDebt = (state) => state.associates.errorDebt;
const selectDebt = (state) => state.associates.debt;
const selectErrorDebt = (state) => state.associates.errorDebt;
const selectTotalDebt = (state) => state.associates.debtTotal;

const fetchDebt = (typeInfo) => async (dispatch) => {
  console.log("aqui joao jorge")
  dispatch(setLoadingDebt(true)); // Set loading to true
  try {
    /*
    const response = await axiosInstance.post('/admin/associates/editTypeAssociate',typeInfo); // Make a request using Axios
    if(response.status == 200) {
      dispatch(setSuccessEditTipo());
    } else {
      toast.error("Error Getting Associates Info!");
    }
    */
   let data = [{
      season: "2024",
      tipo: "tipo de socio",
      valor: 15
   },
    {
      season: "2023",
      tipo: "tipo de socio 2",
      valor: 10
    },
    {
      season: "2022",
      tipo: "tipo de socio 3",
      valor: 25
    }]

    let total = 0

    for(let i=0; i<data.length; i++){
      total += data[i].valor
    }

    dispatch(setDebt(data))
    dispatch(setDebtTotal(total))
    
  } catch (error) {
    alert(error.message)
    setErrorDebt(error.message)
    toast.error("Error Getting Debt Info!");
  }
  dispatch(setLoadingDebt(false)); // Set loading to true
};


const fetchEditTipo = (typeInfo) => async (dispatch) => {
  dispatch(setLoadingEditTipo(true)); // Set loading to true
  try {
    const response = await axiosInstance.post('/admin/associates/editTypeAssociate',typeInfo); // Make a request using Axios
    if(response.status == 200) {
      dispatch(setSuccessEditTipo());
    } else {
      toast.error("Error Getting Associates Info!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    toast.error("Error Getting Associates Info!");
  }
  dispatch(setLoadingEditTipo(false)); // Set loading to true
};


const fetchTipoSocios = (filters) => async (dispatch) => {
  dispatch(setLoadingTiposSocios(true)); // Set loading to true
  try {
    /*
    const response = await axiosInstance.post('/admin/associates/getActiveAssociates'); // Make a request using Axios
    if(response.status == 200) {
      const { data, columns, statusOptions } = response.data;
      let dataCor = {
        data: data,
        headers: columns,
        statusOptions: statusOptions
      }
      console.log("aqui user")
      console.log(data)
      dispatch(setAssociates(dataCor));
      */
     let olare = {
        data: [
          {
            id: 1,
            name: "Especial",
            status: "active",
            valor: "29"
          },
          {
            id: 2,
            name: "Efetivo",
            status: "active",
            valor: "29"
          },
          {
            id: 3,
            name: "Teste",
            status: "active",
            valor: "29"
          }
        ],
        headers: [
          {name: "NAME", uid: "name"},
          {name: "VALOR", uid: "valor"},
          {name: "STATUS", uid: "status"},
          {name: "ACTIONS", uid: "actions"},
        ]
      }
      dispatch(setTipoSocios(olare));
      /*
    } else {
      dispatch(setErrorGetTiposSocios("Error Getting Associates Info"));
      toast.error("Error Getting Associates Info!");
    }
      */
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorGetTiposSocios(error.message)); // Dispatch an error if the request fails
    toast.error("Error Getting Associates Info!");
  }
  dispatch(setLoadingTiposSocios(false)); // Set loading to true
}

const fetchAssociates = (filters) => async (dispatch) => {
  dispatch(setLoadingAssociates(true)); // Set loading to true
  try {
    const response = await axiosInstance.post('/admin/associates/getActiveAssociates'); // Make a request using Axios
    if(response.status == 200) {
      const { data, columns, statusOptions } = response.data;
      let dataCor = {
        data: data,
        headers: columns,
        statusOptions: statusOptions
      }
      dispatch(setAssociates(dataCor));
    } else {
      dispatch(setErrorGetAssociates("Error Getting Associates Info"));
      toast.error("Error Getting Associates Info!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorGetAssociates(error.message)); // Dispatch an error if the request fails
    toast.error("Error Getting Associates Info!");
  }
  dispatch(setLoadingAssociates(false)); // Set loading to true
};


const fetchFilters = () => async (dispatch) => {
  console.log("aqui no fetch")
  dispatch(setLoadingFilters(true)); // Set loading to true
  try {
    const response = await axiosInstance.get('/admin/associates/filters'); // Make a request using Axios
    if(response.status == 200) {
      const { seasons, status, associatesNumber } = response.data;
      let dataCor = {
        seasons: seasons,
        status: status,
        associatesNumber: associatesNumber
      }
      dispatch(setFilters(dataCor));
    } else {
      dispatch(setErrorGetFilters("Error Getting Filters"));
      toast.error("Error Getting Filters!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorGetFilters(error.message)); // Dispatch an error if the request fails
    toast.error("Error Getting Filters!");
  }
  dispatch(setLoadingFilters(false)); // Set loading to true
};

const fetchEditAssociate = (typeInfo) => async (dispatch) => {
  dispatch(setLoadingEdit(true)); // Set loading to true
  try {
    const response = await axiosInstance.post('/admin/associates/editTypeAssociate',typeInfo); // Make a request using Axios
    if(response.status == 200) {
      dispatch(setSucessEdit());
    } else {
      setErrorEdit("Error Edit Associates Info!")
      toast.error("Error Edit Associates Info!");
    }
    
  } catch (error) {
    setErrorEdit("Error Edit Associates Info!")
    toast.error("Error Getting Associates Info!");
  }
  dispatch(setLoadingEdit(false)); // Set loading to true
};

export default associatesSlice.reducer;

export {
  setAssociates,
  setLoadingAssociates,
  setErrorGetAssociates,
  setClearAll,
  selectAssociates,
  selectErrorGetAssociates,
  selectLoadingAssociates,
  fetchAssociates,
  selectAssociatesHeaders,
  selectAssociatesStatusOptions,
  setLoadingFilters,
  setFilters,
  setErrorGetFilters,
  fetchFilters,
  selectSeasons,
  selectStatus,
  selectAssociatesNumber,
  selectErrorGetFilters,
  selectLoadingFilters,
  setTipoSocios,
  selectTipoSocios,
  selectLoadingTiposSocios,
  selectErrorGetTiposSocios,
  fetchTipoSocios,
  selectHeadersTipoSocios,
  setClearEditTipo,
  selectLoadingEditTipo,
  selectSuccessEditTipo,
  fetchEditTipo,
  fetchEditAssociate,
  selectLoadingEdit,
  selectSucessEdit,
  selectErrorEdit,
  selectLoadingDebt,
  selectDebt,
  selectErrorDebt,
  fetchDebt,
  selectTotalDebt,
  setDebtTotal
};