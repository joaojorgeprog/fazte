import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/auth';
import menusReducer from '../../slices/menus';
import userReducer from '../../slices/user';
import associatesReducer from '../../slices/associates';
import authMiddleware from '../../middleware/authMiddleware';
import contadorReducer from '../../slices/contador';


const store = configureStore({
  reducer: {
    auth: authReducer,
    menus: menusReducer,
    user: userReducer,
    associates: associatesReducer,
    contador: contadorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware), // Adiciona o middleware ao Redux
});

// Infer the `RootState` and `AppDispatch` types from the store itself
const RootState = store.getState;
// Inferred type: { counter: CounterState, kafka: KafkaState }
const AppDispatch = store.dispatch;

export { store, RootState, AppDispatch };
