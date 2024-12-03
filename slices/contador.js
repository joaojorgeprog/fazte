import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  valorContador: 0
};

const contadorSlice = createSlice({
  name: 'contador',
  initialState,
  reducers: {
    setAddCount(state, action){
      state.valorContador = state.valorContador + action.payload
    },
    setMenosCount(state, action){
      state.valorContador = state.valorContador - action.payload
    },
    setClearAll() {
      return initialState;
    },

  },
  
});

// Action creators are generated for each case reducer function
const { 
  setAddCount,
  setMenosCount
} = contadorSlice.actions;

const valorAtualContador = (state) => state.contador.valorContador;

const addVal = () => async (dispatch) => {
  try {
      dispatch(setAddCount(1));
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

const menosVal = () => async (dispatch) => {
  try {
      dispatch(setMenosCount(1));
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

export default contadorSlice.reducer;

export {
  addVal,
  menosVal,
  valorAtualContador
};