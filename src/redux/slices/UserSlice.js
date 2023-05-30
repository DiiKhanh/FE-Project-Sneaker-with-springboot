import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalPages: 0,
  },
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload.data;
      state.totalPages = action.payload.total_pages;
    },
  },
});
export const { allUsers } = userSlice.actions;
export default userSlice.reducer;
