import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axiosConfig';
import utils from './utils';
import { toast } from 'react-toastify';


const {handleTableHeaders, handlePicker, prepareSFIDTable, preparepvpositionUNE, preparepvpositionUNP} = utils;

const initialState = {
  userInfo: [],
  errorGettingUserInfo: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action){
      state.userInfo = action.payload;
      state.errorGettingUserInfo = null
    },
    setErrorUserInfo(state, action){
      state.errorGettingUserInfo = action.payload;
    },
    setClearAll() {
      return initialState;
    },

  },
  
});

// Action creators are generated for each case reducer function
const { 
  setUserInfo,
  setErrorUserInfo,
  setClearAll
} = userSlice.actions;

const selectUserInfo = (state) => state.user.userInfo;
const selectErrorUserInfo = (state) => state.user.errorGettingUserInfo;


const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/admin/userDet/user'); // Make a request using Axios
    if(response.status == 200) {
      const { name, email, associateNumber } = response.data;
      let data = {
        name: name,
        email: email, 
        associateNumber: "@" + associateNumber
      }
      dispatch(setUserInfo(data));
    } else {
      dispatch(setErrorUserInfo("Error Getting User Info"));
      toast.error("Error Getting User Info!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorUserInfo(error.message)); // Dispatch an error if the request fails
    toast.error("Error Getting User Info!");
  }
};

export default userSlice.reducer;

export {
  setUserInfo,
  setErrorUserInfo,
  setClearAll,
  selectUserInfo,
  selectErrorUserInfo,
  fetchUserData
};