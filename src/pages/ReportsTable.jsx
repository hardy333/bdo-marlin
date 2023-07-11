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
import "../styles/order-details.css";
import "../styles/pending-status-menu.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import "../styles/reports-table.css";

import DatePickerBtn from "../components/DatePickerBtn";
import { addDays } from "date-fns";
import useRemoveId from "../components/useRemoveId";
import { useQuery } from "react-query";
import TableSettings from "../components/TableSettings";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetchData";
import { useMediaQuery } from "@uidotdev/usehooks";
import ReportsCards from "./ReportsCards";
import {BsFillCalendarCheckFill} from "react-icons/bs"

const ReportsTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "vendor",
      showingName: "მომწოდებელი",
      isShowing: true,
    },
    {
      name: "orders",
      showingName: "შეკვეთები",
      isShowing: true,
    },
    {
      name: "amount",
      showingName: "შეკვეთის თანხა",
      isShowing: true,
    },
    {
      name: "slaByQuantity",
      showingName: "SL რაოდენობით",
      isShowing: true,
    },
    {
      name: "slaByAmount",
      showingName: "SL თანხით",
      isShowing: true,
    },
    {
      name: "inTimeOrders",
      showingName: "დროულად",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const location = useLocation()
  console.log(window.location)
  

  const url = "https://10.0.0.202:5001/api/SLAByVendors";
  const url1 = window.location.origin + "/SLAByVendors.json"

  const { isLoading, error, data } = useQuery("reports-data", () => fetchData(url1));

  const [rowData, setRowData] = useState(() => {
    if (data || data?.data) {
      return data.data;
    }
    return null;
  });

  console.log({error})
  
  useEffect(() => {
    if (!data) return;
    if (isLoading) return;
    if (error) return;
    setRowData(data.data);
  }, [data, isLoading, error]);

  const [columnDefs] = useState([
    {
      field: "vendor",
      headerName: "მომწოდებელი",
      cellRenderer: (params) => {
        return params.value;
      },
    },
    {
      field: "orders",
      headerName: "შეკვეთები",

      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    },
    {
      field: "amount",
      headerName: "შეკვეთის თანხა",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "Gel";
      },
    },
    {
      field: "slaByQuantity",
      headerName: "SL რაოდენობით",
    },
    {
      field: "slaByAmount",
      headerName: "SL თანხით",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "Gel";
      },
    },
    {
      field: "inTimeOrders",
      headerName: "დროულად",
      minWidth: 250,
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "%";
      },
    },
  ]);

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
      suppressMovable: true,
      floatingFilter: true,
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
  };

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const gridRef = useRef(null);

  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
      color: "#6E0FF5",
    },
  ]);
  const [dateChanged, setDateChanged] = useState(false)

  useEffect(() => {
    const x = document.querySelector(
      ".sla-all-table .ag-center-cols-container"
    );

    if (!x) return;

    const handleGridClick = (e) => {
      const t = e.target;
      const row = t.closest(".ag-row");

      const vendor = row.querySelector(".ag-cell[col-id='vendor']").innerText;

      navigate(`/sla-by-orders`);
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  }, [gridApi, gridRef]);

  const navigate = useNavigate();

  useRemoveId(gridApi, gridRef);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 530px)");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const datePicekerRef = useRef(null)

  return (
    <>
      <header className="all-orders__header sla-header reports-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 style={{ fontSize: "18px", width: "130px" }}>სერვისის დონე</h4>
            
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
          <div className={`flex items-center sla-date ${isSearchOpen ? "hide" : ""}`}>
              <span
                style={{
                  fontWeight: "600",
                  paddingRight: 10,
                  display: "flex",
                }}
                className="calendar-span"
                onClick={() => datePicekerRef.current.click()}
              >
                <BsFillCalendarCheckFill />
              </span>
              <DatePickerBtn
              datePicekerRef={datePicekerRef}
              dateChanged={dateChanged}
              setDateChanged={setDateChanged}
                dateState={dateState}
                setDateState={setDateState}
                isSearchOpen={isSearchOpen}
              />
            </div>
            <TableSettings
            isSmallDevice={isSmallDevice}
              defHeaderList={headerList}
              rowData={rowData}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              setIsSearchOpen={setIsSearchOpen}
            />
          </div>
        </div>
      </header>
      {
        isSmallDevice ? <ReportsCards data={rowData} /> : (
          <div
        id="marlin-table"
        className="ag-theme-alpine ag-grid-example sla-all-table sla-colored-cell-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
          getRowHeight={() => {
            if (rowHeightIndex === 0) {
              return 25;
            } else if (rowHeightIndex === 1) {
              return 32;
            } else if (rowHeightIndex === 2) {
              return 37;
            }
          }}
          paginationPageSize={pageSize}
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
        )
      }
    </>
  );
};

export default ReportsTable;
