import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: localStorage.getItem("orderList")
    ? JSON.parse(localStorage.getItem("orderList"))
    : [],
  totalSpent: localStorage.getItem("totalSpent")
    ? localStorage.getItem("totalSpent")
    : 0,
  isLoading: false,
};

const getUserOrderUrl = "";
export const getUserOrder = createAsyncThunk(
  "/order/getUserOrder",
  async (thunkAPI) => {
    try {
      const res = await axios.get(getUserOrderUrl);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const purchasedSlice = createSlice({
  name: "purchased",
  initialState,
  reducers: {
    calculateTotalSpent: (state) => {
      let amount = 0;
      state.orderList.forEach((order) => {
        amount += order.totalAmount;
      });
      state.totalSpent = amount;
    },
    addOrder: (state, action) => {
      state.orderList.push(action.payload);
    },
  },
  extraReducers: {
    [getUserOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderList = action.payload;
    },
    [getUserOrder.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
    },
  },
});

export const { calculateTotalSpent, addOrder } = purchasedSlice.actions;

export default purchasedSlice.reducer;
