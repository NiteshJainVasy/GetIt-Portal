import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { Provider } from "react-redux";
import  store,{ persistor } from "../src/store/index";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);


reportWebVitals();
