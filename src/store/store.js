import { configureStore } from "@reduxjs/toolkit";
import plansReducer from "./plansSlice";
import userReducer from "./userSlice";
import studentsReducer from "./studentsSlice";

const preloadedState = {
  students: JSON.parse(localStorage.getItem("students")) || [],
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    plans: plansReducer,
    students: studentsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("plans", JSON.stringify(store.getState().plans));
});


