import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/index.css"
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>

  <BrowserRouter>
    <div
      className="aside-overlay"
      onClick={() => {
        document.body.classList.remove("body-sidebar-open");
      }}
    ></div>
    <App />
  </BrowserRouter>
  </AuthContextProvider>

  // </React.StrictMode>
);
