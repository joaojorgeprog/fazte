import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';

const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
const RootState = store.getState;
// Inferred type: { counter: CounterState, kafka: KafkaState }
const AppDispatch = store.dispatch;

export { store, RootState, AppDispatch };
