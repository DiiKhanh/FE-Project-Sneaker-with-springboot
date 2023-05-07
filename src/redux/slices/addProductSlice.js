import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("itemsAdded")
    ? JSON.parse(localStorage.getItem("itemsAdded"))
    : [],
};

const addProductSlice = createSlice({
  name: "add-product",
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
          price: newItem.productPrice,
          productName: newItem.productName,
          image: newItem.imgUrl,
          desc: newItem.description,
          category: newItem.category,
        });
      } else {
        // existingItem.quantity++;
        // existingItem.totalPrice =
        //   Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // state.totalAmount = state.cartItems.reduce(
      //   (total, item) => total + Number(item.price) * Number(item.quantity),
      //   0
      // );
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        // state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      // state.totalAmount = state.cartItems.reduce(
      //   (total, item) => total + Number(item.price) * Number(item.quantity),
      //   0
      // );
    },
    editItem: (state, action) => {
      const newData = action.payload;
      const dataIndex = state.cartItems.findIndex(
        (data) => data.id === newData.id
      );
      if (dataIndex >= 0) {
        state.cartItems[dataIndex] = newData;
      }
    },
    // increase: (state, action) => {
    //   const id = action.payload;
    //   state.totalQuantity += 1;
    //   const selectedItem = state.cartItems.find((item) => item.id === id);
    //   // If needed, add condition: quantity lower than stock remain
    //   selectedItem.quantity += 1;
    // },
    // decrease: (state, action) => {
    //   const id = action.payload;
    //   state.totalQuantity -= 1;
    //   const selectedItem = state.cartItems.find((item) => item.id === id);
    //   // If needed, add condition: quantity lower than stock remain
    //   if (selectedItem.quantity > 1) {
    //     selectedItem.quantity -= 1;
    //   }
    // },
    // calculateTotal: (state) => {
    //   let totalQuantity = 0;
    //   let totalAmount = 0;
    //   state.cartItems.forEach((item) => {
    //     totalQuantity += item.quantity;
    //     totalAmount += item.quantity * item.price;
    //   });
    //   state.totalAmount = totalAmount;
    //   state.totalQuantity = totalQuantity;
    // },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const cartActions = addProductSlice.actions;
export const { clearCart, deleteItem, addItem, editItem } =
  addProductSlice.actions;

export default addProductSlice.reducer;
