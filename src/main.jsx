import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <div
      className="aside-overlay"
      onClick={() => {
        document.body.classList.remove("body-sidebar-open");
      }}
    ></div>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
