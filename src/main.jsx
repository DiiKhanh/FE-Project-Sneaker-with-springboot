import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
// import store from "./redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reduxConfig from "./redux/redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = reduxConfig();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={1000}
            closeOnClick
            pauseOnHover={false}
          />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
