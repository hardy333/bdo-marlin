import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles/ag-table-scrollbar.css";


import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./styles/ag-grid.css";


// css
import "./styles/all-orders.css";
import "./styles/global-filter-input.css";
import "./styles/all-orders-parent.css";
import "./styles/pending-status-menu.css";

import "./styles/order-details.css";

import "./styles/cash-back-table.css";

import "./styles/invoices-table.css";

import "./styles/invoice-details-table.css";

import "./styles/logs.css";

import "./styles/vendors-calendar.css";
import "./styles/vendors-calendar-table.css"

import "./styles/catalogue-table.css"
import "./styles/catalogue.css";






import "./styles/index.css";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <div
        className="aside-overlay"
        onClick={() => {
          document.body.classList.remove("body-sidebar-open");
        }}
      ></div>
      <App />
    </AuthContextProvider>
  </BrowserRouter>

  // </React.StrictMode>
);
