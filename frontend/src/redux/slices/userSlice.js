import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Constants from "../../Constants.js";
import userData from "../../userData";
import axios from "axios";
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    // const response = await fetch(`${Constants}/${userId}`);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    // const data = await response.json();
    console.log("Data Fetched", response.data);
    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    loading: false,
    error: false,
  },
  reducers: {
    refreshData: (state, action) => {
      return { data: { ...userData } };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const { refreshData } = userSlice.actions;
export default userSlice.reducer;
