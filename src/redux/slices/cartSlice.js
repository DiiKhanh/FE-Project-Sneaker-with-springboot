import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalAmount: localStorage.getItem("totalAmount")
    ? localStorage.getItem("totalAmount")
    : 0,
  totalQuantity: localStorage.getItem("totalQuantity")
    ? localStorage.getItem("totalQuantity")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          quantity: newItem.quantity,
          price: newItem.price,
          productName: newItem.productName,
          image: newItem.imgUrl,
          totalPrice: newItem.price,
          size: newItem.size,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    increase: (state, action) => {
      const id = action.payload;
      state.totalQuantity += 1;
      const selectedItem = state.cartItems.find((item) => item.id === id);
      // If needed, add condition: quantity lower than stock remain
      selectedItem.quantity += 1;
    },
    decrease: (state, action) => {
      const id = action.payload;
      state.totalQuantity -= 1;
      const selectedItem = state.cartItems.find((item) => item.id === id);
      // If needed, add condition: quantity lower than stock remain
      if (selectedItem.quantity > 1) {
        selectedItem.quantity -= 1;
      }
    },
    calculateTotal: (state) => {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.cartItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalAmount += item.quantity * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export const { clearCart, calculateTotal, increase, decrease, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;
