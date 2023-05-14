import rootReducer from "./store";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

const reduxConfig = () => {
  const store = configureStore({ reducer: rootReducer });
  const persistor = persistStore(store);
  return { store, persistor };
};
export default reduxConfig;
