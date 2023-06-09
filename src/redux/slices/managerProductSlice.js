import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: null,
  productsPage: [],
  totalPages: 0,
  trendingProducts: [],
  bestSalesProducts: [],
  popularProducts: [],
};

export const fetchAllProduct = createAsyncThunk(
  "managerProduct/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await api.getAllProducts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "managerProduct/add",
  async (dataAddProduct, thunkAPI) => {
    const { data, token } = dataAddProduct;
    try {
      const response = await api.addProduct(data, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// edit product
export const editProduct = createAsyncThunk(
  "managerProduct/edit",
  async (dataAddProduct, thunkAPI) => {
    const { id, data, token } = dataAddProduct;
    try {
      const response = await api.updateProduct(id, data, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// delete
export const deleteProduct = createAsyncThunk(
  "managerProduct/delete",
  async (dataDelete, thunkAPI) => {
    const { id, token } = dataDelete;
    try {
      const response = await api.deleteProduct(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const managerProductSlice = createSlice({
  name: "managerProductSlice",
  initialState,
  reducers: {
    dataProductsPage: (state, action) => {
      state.productsPage = action.payload.data;
      state.totalPages = action.payload.total_pages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload.data;
        state.trendingProducts = action.payload.data.filter(
          (item) => item.category === "basketball"
        );
        state.bestSalesProducts = action.payload.data.filter(
          (item) => item.category === "running"
        );
        state.popularProducts = action.payload.data.filter(
          (item) => item.category === "lifestyle"
        );
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = [...state.products, action.payload.data];
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.pending, (state) => {})
      .addCase(editProduct.fulfilled, (state, action) => {
        const newData = action.payload.data;
        // all
        const dataIndex = state.products.findIndex(
          (data) => data.id === newData.id
        );
        if (dataIndex >= 0) {
          state.products[dataIndex] = newData;
        }
      })
      .addCase(editProduct.rejected, (state) => {})
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const existingItem = state.products.find(
          (item) => item.id === action.payload
        );
        const itemPage = state.productsPage.find(
          (item) => item.id === action.payload
        );
        if (existingItem) {
          state.products = state.products.filter(
            (item) => item.id !== action.payload
          );
        }
        if (itemPage) {
          state.productsPage = state.productsPage.filter(
            (item) => item.id !== action.payload
          );
        }
      });
  },
});

export default managerProductSlice.reducer;
export const { dataProductsPage } = managerProductSlice.actions;
