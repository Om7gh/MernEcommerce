import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const root = createRoot(document.getElementById("root"));
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

let persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </AlertProvider>
  </Provider>
);
