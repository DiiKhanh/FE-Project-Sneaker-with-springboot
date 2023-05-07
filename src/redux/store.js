import { configureStore } from "@reduxjs/toolkit";
import addProductSlice from "./slices/addProductSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import ProductSlice from "./slices/ProductSlice";
import purchasedSlice from "./slices/purchasedSlice";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    purchased: purchasedSlice,
    auth: authSlice,
    product: ProductSlice,
    addProduct: addProductSlice,
    user: UserSlice,
  },
});

export default store;
