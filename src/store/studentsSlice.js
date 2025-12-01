import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("students", JSON.stringify(state));
    },
    deleteStudent: (state, action) => {
      const updated = state.filter((s) => s.id !== action.payload);
      localStorage.setItem("students", JSON.stringify(updated));
      return updated;
    },
    loadStudents: () => {
      return JSON.parse(localStorage.getItem("students")) || [];
    },
  },
});

export const { addStudent, deleteStudent, loadStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
