import { configureStore } from '@reduxjs/toolkit';
import viewReducer from './viewSlice';

export const store = configureStore({
  reducer: {
    view: viewReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});