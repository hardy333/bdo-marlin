import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import DashboardLayout from "../layout/DashboardLayout";

const AgTable = () => {
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    {
      field: "Number",
    },
    {
      field: "Item",
    },
    {
      field: "Ordered",
    },
    {
      field: "Delivered",
    },
    {
      field: "In time",
    },
    {
      field: "Service level",
    },
    {
      field: "Product Category",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      console.log(data);

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  return (
    <DashboardLayout>
      <div className="ag-theme-alpine ag-grid-example" style={{ height: 526 }}>
        <AgGridReact
          rowStyle={{ maxHeight: "40px", height: "40px" }}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          // paginationAutoPageSize={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </DashboardLayout>
  );
};

export default AgTable;
