import React, { useEffect, useMemo, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/ag-table-scrollbar.css";

import { AgGridReact } from "ag-grid-react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";

// css
import "../styles/ag-grid.css";
// import fetch_XLSX_DATA from "../utils/getData";
import CustomHeaderCell from "../components/CustomHeaderCell";
import "../styles/stable-table.css";
import { useQuery } from "react-query";
import { OrderDetailsDefs, orderDetailsHeaderList } from "../column-definitions/OrderDetailsDefs";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../utils/fetchData";
import useCopyTable from "../hooks/useCopyTable";

const StableTable = () => {
  const [headerList, setHeaderList] = useState(orderDetailsHeaderList);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [searchParams] = useSearchParams();

  const orderID =
  searchParams.get("orderID") || "6670e89b-306f-11ee-8123-005056b5a0aa";

  const url = `https://10.0.0.202:5001/api/OrderDetailsFront/${orderID}`;

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["stable-table", orderID],
      queryFn: () => fetchData(url)
    }
  );

  const [columnDefs] = useState(OrderDetailsDefs);


  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    floatingFilter: false,
    suppressMovable: false,
    width: 1385 / headerList.filter((obj) => obj.isShowing).length,
    minWidth: 150,
  }));

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    // gridRef.current.api.resetRowHeights();
    setGridReady(true);

    params.api.sizeColumnsToFit();
  };

  const [gridReady, setGridReady] = useState(false);

  useCopyTable(gridReady)

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
      </header>
      <div
        className="ag-theme-alpine stable-table copy-paste-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowData={data?.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressHorizontalScroll={true}
          components={components}
          getRowHeight={(props) => {
            if (2 === 0) {
              return 25;
            } else if (1 === 1) {
              return 32;
            } else if (3 === 2) {
              return 37;
            }
          }}
        ></AgGridReact>
      </div>
    </>
  );
};

export default StableTable;
