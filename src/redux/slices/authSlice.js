import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      const response = await api.signIn(data);
      return response.data;
    } catch (error) {
      return error;
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
      return error;
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
      return error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
  },
  reducers: {
    logOut: (state) => {
      state.currentUser = null;
    },
    editProfile: (state, action) => {
      state.currentUser = action.payload.data;
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
        state.currentUser = null;
      });
  },
});
export const { logOut, editProfile } = authSlice.actions;
export default authSlice.reducer;
