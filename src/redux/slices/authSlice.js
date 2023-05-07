import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      const response = await api.signIn(data);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error.response);
      return error.response;
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      const response = await api.signUp(data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const logOutAuth = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      const response = await api.logOut();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // currentUser: {
    //   roles: ["ROLE_ADMIN"],
    // },
    currentUser: null,
    loading: false,
  },
  reducers: {
    logOut: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logOutAuth.fulfilled, (state, action) => {
        // state.currentUser = action.payload.data;
        state.currentUser = null;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
