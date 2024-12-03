import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axiosConfig';
import utils from './utils';
import { toast } from 'react-toastify';


const {handleTableHeaders, handlePicker, prepareSFIDTable, preparepvpositionUNE, preparepvpositionUNP} = utils;

const initialState = {
  haveLogin: false,
  token: null,
  refreshToken: null,
  errorLogin: null,
  loadingLogin: false,
  loadingRegister: false,
  errorRegister: null,
  sucessRegister: false,
  validateLogin: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setValidatinLogin(state, action){
      state.validateLogin = action.payload;
    },
    setLoadingLogin(state, action){
      state.loadingLogin = action.payload;
    },
    setLogin(state, action){
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.token = action.payload.token;
      state.haveLogin = action.payload.haveLogin;
      state.refreshToken = action.payload.refreshToken;
      state.errorLogin = action.payload.errorLogin;
      state.loadingLogin = action.payload.loadingLogin;
    },
    setErrorLogin(state, action){
      state.token = null;
      state.haveLogin = false;
      state.refreshToken = null;
      state.errorLogin = action.payload.errorLogin;
      state.loadingLogin = false;
    },
    setLogout(state, action){
      state.token = null;
      state.haveLogin = false;
      state.refreshToken = null;
      state.errorLogin = null;
      state.loadingLogin = false;
    },

    setLoadingRegister(state, action){
      state.loadingRegister = action.payload;
    },

    setErrorRegister(state, action){
      state.loadingRegister = false;
      state.sucessRegister = false;
      state.errorRegister = action.payload;
    },

    setSucessRegister(state, action){
      state.loadingRegister = false;
      state.sucessRegister = true;
      state.errorRegister = null;
    },

    setClearAll() {
      return initialState;
    },

  },
  
});

// Action creators are generated for each case reducer function
const { 
  setLoadingLogin,
  setLogin,
  setErrorLogin,
  setClearAll,
  setLogout,
  setSucessRegister,
  setErrorRegister,
  setLoadingRegister,
  setValidatinLogin
} = authSlice.actions;

const selectLoadingLogin = (state) => state.auth.loadingLogin;
const selectToken = (state) => state.auth.token;
const selectErrorLogin = (state) => state.auth.errorLogin;
const selectHavelogin = (state) => state.auth.haveLogin;

const selectloadingRegister = (state) => state.auth.loadingRegister;
const selectErrorRegister = (state) => state.auth.errorRegister;
const selectSucessRegister = (state) => state.auth.sucessRegister;

const selectValidateLogin = (state) => state.auth.validateLogin;

const fetchLogin = (loginInfo) => async (dispatch) => {
  dispatch(setLoadingLogin(true)); // Set loading to true
  try {
    const response = await axiosInstance.post('/admin/user/login', loginInfo); // Make a request using Axios
    if(response.status == 200) {
      const { token, refreshToken } = response.data;
      let data = {
        token: token,
        haveLogin: true,
        refreshToken: refreshToken,
        errorLogin: null,
        loadingLogin: false
      }
      //let b = handleTableHeaders(response.data.response);
      dispatch(setLogin(data));
      toast.success("Success Login!");
    } else {
      dispatch(setErrorLogin("Error Login"));
      toast.error("Error Login!");
    }
    
  } catch (error) {
    console.log("error");
    console.log(error);
    dispatch(setErrorLogin(error.message)); // Dispatch an error if the request fails
    toast.error("Error Login, try again!");
  }
  dispatch(setLoadingLogin(false)); // Set loading back to false
};


const fetchRegister = (registerInfo) => async (dispatch) => {
  dispatch(setLoadingRegister(true)); // Set loading to true
  try {
    const response = await axiosInstance.post('/admin/user/register', registerInfo); // Make a request using Axios
    if(response.status == 201) {
      const { message } = response.data;
      //let b = handleTableHeaders(response.data.response);
      dispatch(setSucessRegister());
      toast.success(message);
    } else {
      dispatch(setErrorRegister("Error Register"));
      toast.error("Error Register!");
    }
    
  } catch (error) {
    dispatch(setErrorRegister(error.message)); // Dispatch an error if the request fails
    toast.error("Error Register, try again!");
  }
  dispatch(setLoadingRegister(false)); // Set loading back to false
};

const fetchLogout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  dispatch(setLogout())
}

const fetchValidateLogin = () => async (dispatch) => {
  dispatch(setValidatinLogin(true))
  try {
    let token = localStorage.getItem('token');

    if (!token) {
      //aqui tem de validar se a rota não é já o /
      // e só depois manda para lá
      router.push('/'); // Redireciona para o login se não houver token
    } else {
      let data = {
        token: localStorage.getItem('token'),
        haveLogin: true,
        refreshToken: localStorage.getItem('refreshToken'),
        errorLogin: null,
        loadingLogin: false
      }
      //let b = handleTableHeaders(response.data.response);
      dispatch(setLogin(data));
    }
  } catch(error) {
    console.log("error validate login")
    router.push('/');
  }
  dispatch(setValidatinLogin(false))
}

export default authSlice.reducer;

export {
  fetchLogin,
  fetchLogout,
  selectLoadingLogin,
  selectToken,
  selectErrorLogin,
  selectHavelogin,
  setLoadingLogin,
  setLogin,
  setErrorLogin,
  setClearAll,
  setLogout,
  fetchRegister,
  setSucessRegister,
  setErrorRegister,
  setLoadingRegister,
  selectloadingRegister,
  selectErrorRegister,
  selectSucessRegister,
  fetchValidateLogin,
  selectValidateLogin,
  setValidatinLogin
};
