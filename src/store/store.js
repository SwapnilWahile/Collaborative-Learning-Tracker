import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./plansSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    plans: plansReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('plans', JSON.stringify(store.getState().plans));
});
