import React, { useEffect, useMemo, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/ag-table-scrollbar.css";

// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import ExpandingInput from "../components/ExpandingInput";

import "../styles/logs.css";

// import d from "../assets/LOGS_MOCK_DATA.json";
import useFilterToggle from "../hooks/useFilterToggle";
import LazyExcelExportBtn from "../components/LazyExcelExportBtn";
import { LogsTableDefs } from "../column-definitions/LogsTableDefs";
import useCopyTable from "../hooks/useCopyTable";
import AgTablePag from "../components/AgTablePag";

const LogsTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const gridRef = useRef(null);

  const [columnDefs] = useState(LogsTableDefs);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/LOGS_MOCK_DATA.json");
      const d = await res.json();
      setRowData(d);
    };
    getData();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      floatingFilter: false,
      suppressMovable: true,
      floatingFilterComponent: CustomInput,
    }),
    []
  );

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    console.log(2121);

    gridApi.setQuickFilter(e.target.value);
  };

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  useFilterToggle();

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridReady(true);

  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [gridReady, setGridReady] = useState(false);


  useCopyTable(gridReady)
  
  
  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        <div className="all-orders__settings settings-container-responsive">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10, cursor: "default" }}
          >
            <span className={`${isSearchOpen ? "hide" : ""}`}>Logs</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <ExpandingInput
              setIsSearchOpen={setIsSearchOpen}
              onFilterTextChange={onFilterTextChange}
            />
            <LazyExcelExportBtn data={rowData} name="logs" />
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine ag-grid-example copy-paste-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
          paginationPageSize={pageSize}
          rowHeight={32}
        ></AgGridReact>

        <Menu
          className="page-size-menu"
          align="end"
          menuButton={
            <MenuButton className="page-size-btn">
              <span>Rows per page</span>
              <span className="btn">{pageSize}</span>
            </MenuButton>
          }
          transition
        >
          {pageSizes.map((size) => {
            return (
              <MenuItem
                key={size}
                onClick={() => {
                  setPageSize(size);
                }}
                style={{ color: pageSize === size ? "#1A1F3D" : "" }}
              >
                {size}
              </MenuItem>
            );
          })}
        </Menu>
        {gridReady === true && (
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(rowData?.length / pageSize)}
            />
          )}
      </div>
    </>
  );
};

export default LogsTable;
