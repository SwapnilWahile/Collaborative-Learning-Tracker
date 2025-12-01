import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./plansSlice";
import userReducer from "./userSlice";
import studentsReducer from "./studentsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    plans: plansReducer,
    students: studentsReducer
  },
});

store.subscribe(() => {
  localStorage.setItem('plans', JSON.stringify(store.getState().plans));
});
