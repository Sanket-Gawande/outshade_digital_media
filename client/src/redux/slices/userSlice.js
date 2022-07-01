import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { type, payload }) => {
      localStorage.setItem("userOutshade", JSON.stringify(user));
      return {
        user: payload,
      };
    },
    signup: (state, { type, payload }) => {
      localStorage.setItem("userOutshade", JSON.stringify(user));
      return {
        user: payload,
      };
    },
    logout: (state, action) => {
      localStorage.setItem("userOutshade", null);
      return {
        user: null,
      };
    },
  },
});

export default userSlice.reducer;
export const { login, logout, signup } = userSlice.actions;

