import { configureStore } from '@reduxjs/toolkit';
import plansReducer from './plansSlice';

export const store = configureStore({
  reducer: {
    plans: plansReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('plans', JSON.stringify(store.getState().plans));
});