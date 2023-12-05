import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import "../styles/all-orders-parent.css";
import "../styles/vendors-calendar.css";
import "../styles/vendors-calendar-table.css"


const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";


import d1 from "../assets/vendors-calendar-1.json";
import d2 from "../assets/vendors-calendar-2.json";

import Select from "react-select";
import { DayPicker } from "react-day-picker";
import useRemoveId from "../components/useRemoveId";



import vendorsArr from "../data/vendors-data";
import {
  CalendarTableDefs,
  calendarTableHeaderList,
} from "../column-definitions/CalendarTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import DatePickerInput from "../components/DatePickerInput";
import CalendartableCards from "../components/CalendarTableCards";
import useCopyTable from "../hooks/useCopyTable";

const VendorsCalendarTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState(calendarTableHeaderList);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d1);

  const gridRef = useRef(null);

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const [columnDefs] = useState(CalendarTableDefs);

  const [rowDataLabel, setRowDataLabel] = useState("d1");

  const changeRowData = () => {
    if (rowDataLabel === "d1") {
      setRowData(d2);
      setRowDataLabel("d2");
    } else {
      setRowData(d1);
      setRowDataLabel("d1");
    }
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add("dashboard-main-fullscreen");
    } else {
      document.body.classList.remove("dashboard-main-fullscreen");
    }
  }, [isFullScreen]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      suppressMovable: true,
      floatingFilterComponent: CustomInput,
    }),
    []
  );

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridRef.current.api.resetRowHeights();
    setGridReady(true)
  };

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);


  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const [selected, setSelected] = useState(new Date());

  useRemoveId(gridApi, gridRef);


  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");


  const [gridReady, setGridReady] = useState(false);

  useCopyTable(gridReady)
  return (
    <>
      <header className="all-orders__header calendar-table-header vendors-calendar-header ">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="all-orders__gdm-container  order-details-left "
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <span className="me-8 heading">მომწოდებლების კალენდარი</span>

            <DatePickerInput />
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={vendorsArr}
              defaultValue={{ value: "GDM", label: "GDM" }}
              onChange={() => {
                changeRowData();
              }}
            />
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={calendarTableHeaderList}
              rowData={rowData}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="all-orders"
            />
          </div>
        </div>
      </header>
      {/* ..... */}
      <div className="flex gap-2">
        <div className="vendors-calendar__left">
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima eum,
          praesentium natus repellat nulla illo inventore, nisi suscipit,
          aliquam aspernatur ducimus quia tempore sunt voluptates recusandae
          veniam eius illum reprehenderit! */}
          {/* <VendorsDateRange changeRowData={changeRowData} /> */}
          <div className=" date-picker-wrapper">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(x) => {
                setSelected(x);
                changeRowData();
              }}
              showOutsideDays={true}
              enableOutsideDaysClick={false}
            />
          </div>
        </div>

        {isSmallDevice ? (
          <CalendartableCards data={rowData} />
        ) : (
          <div
            id="marlin-table"
            className="ag-theme-alpine ag-grid-example copy-paste-table "
            style={{ minHeight: 595, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              getRowHeight={() => {
                if (rowHeightIndex === 0) {
                  return 25;
                } else if (rowHeightIndex === 1) {
                  return 32;
                } else if (rowHeightIndex === 2) {
                  return 37;
                }
              }}
              onGridReady={onGridReady}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              components={components}
              paginationPageSize={pageSize}
              suppressHorizontalScroll={true}
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
          </div>
        )}
      </div>
    </>
  );
};

export default VendorsCalendarTable;
