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
    editUser: (state, action) => {
      const newData = action.payload.data;
      // all
      const dataIndex = state.users.findIndex((data) => data.id === newData.id);
      if (dataIndex >= 0) {
        state.users[dataIndex] = newData;
      }
    },
  },
});
export const { allUsers, editUser } = userSlice.actions;
export default userSlice.reducer;
