import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axiosConfig';
import utils from './utils';
import { toast } from 'react-toastify';


const {handleTableHeaders, handlePicker, prepareSFIDTable, preparepvpositionUNE, preparepvpositionUNP} = utils;

const initialState = {
  menus: [],
  errorGettingMenus: null
};

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    setMenus(state, action){
      state.menus = action.payload;
      state.errorGettingMenus = null
    },
    setErrorGettingMenus(state, action){
      state.menus = [];
      state.errorGettingMenus = action.payload;
    },
    setClearAll() {
      return initialState;
    },

  },
  
});

// Action creators are generated for each case reducer function
const { 
  setMenus,
  setErrorGettingMenus,
  setClearAll
} = menusSlice.actions;

const selectMenus = (state) => state.menus.menus;
const selectErrorGettingMenus = (state) => state.menus.errorGettingMenus;


const fetchMenus = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/admin/userDet/accessMenus'); // Make a request using Axios
    if(response.status == 200) {
      const { menus } = response.data;
      dispatch(setMenus(menus));
    } else {
      dispatch(setErrorGettingMenus("Error Getting Menus"));
      toast.error("Error Getting Menus!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorGettingMenus(error.message)); // Dispatch an error if the request fails
    toast.error("Error Getting Menus!");
  }
};

const clearDataMenus = () => async (dispatch) => {
  console.log("a tetnar apagar menus")
  dispatch(setClearAll())
}

export default menusSlice.reducer;

export {
  setMenus,
  setErrorGettingMenus,
  setClearAll,
  fetchMenus,
  selectMenus,
  selectErrorGettingMenus,
  clearDataMenus
};
