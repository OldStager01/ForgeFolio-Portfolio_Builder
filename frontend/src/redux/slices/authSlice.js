import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload;
      state.isAuthenticated = true;
      console.log("login successfull", state._id);
      return state;
    },
    logout: (state) => {
      state._id = null;
      state.isAuthenticated = false;
      return state;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
