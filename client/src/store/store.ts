import reducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
