import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../api";
const initialState = {
  products: [],
  product: {},
  cartItems: localStorage.getItem("itemsAdded-test")
    ? JSON.parse(localStorage.getItem("itemsAdded-test"))
    : [],
  testItems: [],
};

export const fetchAllProduct = createAsyncThunk(
  "product/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await api.getAllProducts();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const response = await api.getProduct(id);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (info, thunkAPI) => {
    try {
      const { data, token } = info;
      const res = await api.addProduct(data, token);
      // console.log(res);
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (data, thunkAPI) => {
    const { id, token } = data;
    try {
      const res = await api.deleteProduct(id, token);
      return id;
    } catch (error) {
      return error;
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update",
  async (dataEdit, thunkAPI) => {
    const { id, data, token } = dataEdit;
    try {
      const response = await api.updateProduct(id, data, token);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProductTest: (state, action) => {
      state.testItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        // state.products = action.payload;
        const newItem = action.payload.data;
        const existingItem = state.cartItems.find(
          (item) => item.id === newItem.id
        );
        // state.totalQuantity++;
        if (!existingItem) {
          state.cartItems = newItem;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
        if (existingItem) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          // state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const newData = action.payload.data;
        const dataIndex = state.cartItems.findIndex(
          (data) => data.id === newData.id
        );
        if (dataIndex >= 0) {
          state.cartItems[dataIndex] = newData;
        }
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { getAllProductTest } = productSlice.actions;
