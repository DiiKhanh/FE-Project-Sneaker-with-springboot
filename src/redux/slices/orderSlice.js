import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrderItems: [],
  },
  reducers: {},
});

export default orderSlice.reducer;
