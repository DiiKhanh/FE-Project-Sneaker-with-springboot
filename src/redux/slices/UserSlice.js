import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { allUsers } = userSlice.actions;
export default userSlice.reducer;
