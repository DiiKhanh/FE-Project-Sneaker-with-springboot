import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import addProductSlice from "./slices/addProductSlice";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import ProductSlice from "./slices/ProductSlice";
import purchasedSlice from "./slices/purchasedSlice";
import UserSlice from "./slices/UserSlice";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import managerProductSlice from "./slices/managerProductSlice";
import { persistReducer } from "redux-persist";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const currentUserConfig = {
  ...commonConfig,
  key: "currentUser",
};

const cartItems = {
  ...commonConfig,
  key: "cartItems",
};

const store = combineReducers({
  cart: cartSlice,
  purchased: purchasedSlice,
  // purchased: persistReducer(cartItems, purchasedSlice),
  auth: persistReducer(currentUserConfig, authSlice),
  product: ProductSlice,
  // addProduct: addProductSlice,
  user: UserSlice,
  managerProduct: managerProductSlice,
});

// const store = configureStore({
//   reducer: {
//     cart: cartSlice,
//     purchased: purchasedSlice,
//     auth: authSlice,
//     product: ProductSlice,
//     addProduct: addProductSlice,
//     user: UserSlice,
//   },
// });

export default store;
