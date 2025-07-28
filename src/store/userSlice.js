import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: localStorage.getItem('userType') || null, // hydrate from localStorage if available
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.type = action.payload;
      localStorage.setItem("userType", action.payload); // persist in localStorage
    },
    clearUserType: (state) => {
      state.type = null;
      localStorage.removeItem("userType");
    },
  },
});

export const { setUserType, clearUserType } = userSlice.actions;
export default userSlice.reducer;
