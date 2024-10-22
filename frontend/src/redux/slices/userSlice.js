import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Constants from "../../Constants.js";
import userData from "../../userData";
import axios from "axios";

export const refreshData = createAsyncThunk("user/refreshData", async (_id) => {
  try {
    console.log("ID", _id);
    const response = await fetch(`${Constants.url}/user/details`, {
      method: "GET",
      credentials: "include",
    });
    console.log("Data Fetched", response.data);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    loading: false,
    error: false,
  },
  reducers: {
    // refreshData: (state, action) => {
    //   return { data: { ...userData } };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshData.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshData.fulfilled, (state, action) => {
        state.data = action.payload.userProfile;
        return state;
      })
      .addCase(refreshData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const { refreshData } = userSlice.actions;
export default userSlice.reducer;
