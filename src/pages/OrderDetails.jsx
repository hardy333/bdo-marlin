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
import "../styles/order-details.css";

// images
import arrowLeft from "../assets/all-orders/arrow-left.svg";
import expand from "../assets/all-orders/expand.svg";
import filter from "../assets/all-orders/filter.svg";
import search from "../assets/all-orders/search.svg";
import x from "../assets/all-orders/x.svg";
import cardPink from "../assets/all-orders/car-pink.svg";
import burgerLines from "../assets/all-orders/view-list.svg";
// Right Icons
import expandSvg from "../assets/marlin-icons/expand.svg";
import horizontalLines from "../assets/marlin-icons/horizontal-lines.svg";
import filterSvg from "../assets/marlin-icons/filter-lines.svg";
import optionsLines from "../assets/marlin-icons/options-lines.svg";

import classNames from "classnames";
import { Switch } from "@mui/material";
import { COLUMNS_BY_ITEM } from "../columns";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import DashboardLayout from "../layout/DashboardLayout";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import d from "../assets/MOCK_DATA-2.json";
console.log(d);

const OrderDetails = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "barcode",
      isShowing: true,
    },
    {
      name: "Product",
      isShowing: true,
    },
    {
      name: "Quantity",
      isShowing: true,
    },
    {
      name: "Price",
      isShowing: true,
    },
    {
      name: "Amount",
      isShowing: true,
    },
    {
      name: "Reserved",
      isShowing: true,
    },
    {
      name: "Scheduled",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    {
      field: "barcode",
      cellRenderer: (params) => {
        const { value } = params;
        const index = value.indexOf("-");
        return value.slice(0, index);
      },
    },
    {
      field: "Product",
    },
    {
      field: "Quantity",
    },
    {
      field: "Price",
    },
    {
      field: "Amount",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "GEL";
      },
    },
    {
      field: "Reserved",
    },
    {
      field: "Scheduled",
    },
  ]);
  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const filterButtonTimeout = setTimeout(() => {
      filterButtonRef.current.click();
    }, 1000);

    return () => {
      clearTimeout(filterButtonTimeout);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      // const data = await fetch_XLSX_DATA();
      d.splice(10, 2);

      setRowData(d);
    }

    fetchData();
  }, []);

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
      floatingFilter: showingFloatingFilter,
      suppressMovable: true,
      // floatingFilterComponent: (params) => {
      //   console.log(params.filterParams);

      //   return <input style={{ width: "100%" }} placeholder="Search in table" />;
      // },
      floatingFilterComponent: CustomInput,
    }),
    [showingFloatingFilter]
  );

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    gridApi.setQuickFilter(e.target.value);
  };

  const toggleColumn = (name) => {
    const newHeaderList = headerList.map((header) =>
      header.name !== name
        ? header
        : { ...header, isShowing: !header.isShowing }
    );
    const currHeader = headerList.find((header) => header.name === name);
    setHeaderList(newHeaderList);
    gridColumnApi.setColumnVisible(name, !currHeader.isShowing);
  };

  const hideAllColumns = () => {
    setHeaderList(
      headerList.map((header) => ({ ...header, isShowing: false }))
    );
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, false);
    });
  };

  const showAllColumns = () => {
    setHeaderList(headerList.map((header) => ({ ...header, isShowing: true })));
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, true);
    });
  };

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  // const sortByAthleteDesc = () => {
  //   gridColumnApi.applyColumnState({
  //     state: [{ colId: "Number", sort: "desc" }],
  //     defaultState: { sort: null },
  //   });
  // };

  return (
    <DashboardLayout>
      <header className="all-orders__header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4>order Details</h4>
            <span>GDM</span>
            <span>A.Tsereteli 65</span>
            <span>10/02/2023</span>
            <button className="btn btn-warning">Pending</button>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <button>
              <img src={search} alt="" />
            </button>
            {/* input filter */}
            <button
              ref={filterButtonRef}
              onClick={() => {
                setShowingFloatingFilter((c) => !c);
                setTimeout(() => {
                  document
                    .querySelector(".ag-header-row-column-filter")
                    ?.classList.toggle("hide");
                  document
                    .querySelectorAll(".ag-floating-filter")
                    .forEach((elem) => {
                      elem.classList.toggle("hide");
                    });
                }, 0);
              }}
              className={classNames({
                "all-orders__btn-filter": true,
                "all-orders__btn": true,
                active: showingFloatingFilter,
              })}
            >
              {/* <img src={filterSvg} alt="" /> */}
              <svg
                id="Layer_3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.28 33.65"
              >
                <defs></defs>
                <path
                  className="cls-1"
                  d="m44.44,5.68H2.84c-1.57,0-2.84-1.27-2.84-2.84S1.27,0,2.84,0h41.61c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
                <path
                  className="cls-1"
                  d="m37.34,19.66H9.94c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84h27.4c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
                <path
                  className="cls-1"
                  d="m30.24,33.65h-13.2c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84h13.2c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
              </svg>
            </button>
            {/* popup */}
            <Menu
              align="center"
              direction="top"
              menuButton={
                <MenuButton className="all-orders__btn ">
                  {/* <img src={optionsLines} alt="" className="flip transparent" /> */}
                  <svg
                    id="Layer_3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 33.58 47.28"
                  >
                    <defs></defs>
                    <path
                      className="cls-1"
                      d="m27.9,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                    <path
                      className="cls-1"
                      d="m13.95,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                    <path
                      className="cls-1"
                      d="m0,44.44V2.84C0,1.27,1.27,0,2.84,0s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                  </svg>
                </MenuButton>
              }
              transition
            >
              <div className="column-toggle-popup">
                <header className="column-toggle-popup__header">
                  <button
                    className={classNames({
                      btn: true,
                      active: !headerList.every((header) => !header.isShowing),
                    })}
                    onClick={hideAllColumns}
                  >
                    Hide All
                  </button>
                  <button
                    className={classNames({
                      btn: true,
                      active: headerList.some((header) => !header.isShowing),
                    })}
                    onClick={showAllColumns}
                  >
                    Show All
                  </button>
                </header>
                {headerList.map((header) => (
                  <MenuItem
                    key={header.name}
                    value={header.name}
                    onClick={(e) => {
                      // Stop the `onItemClick` of root menu component from firing
                      // e.stopPropagation = true;
                      // Keep the menu open after this menu item is clicked
                      e.keepOpen = true;
                      toggleColumn(header.name);
                    }}
                  >
                    <Switch checked={header.isShowing} />
                    {header.name}
                  </MenuItem>
                ))}
              </div>
            </Menu>
            {/* padding */}
            <button onClick={() => 2} className="all-orders__btn">
              {/* <img src={horizontalLines} alt="" className="transparent" /> */}
              <svg
                id="Layer_3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 58.81"
              >
                <defs></defs>
                <path
                  className="cls-1"
                  d="m56.93,6.13H3.07c-1.69,0-3.07-1.37-3.07-3.07S1.37,0,3.07,0h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
                />
                <path
                  className="cls-1"
                  d="m56.93,23.69H3.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
                />
                <path
                  className="cls-1"
                  d="m56.93,41.25H3.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
                />
                <path
                  className="cls-1"
                  d="m56.93,58.81H3.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
                />
              </svg>
            </button>
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={classNames({
                "all-orders__btn": true,
                active: isFullScreen,
              })}
            >
              {/* <img src={expandSvg} alt="" /> */}
              <svg
                id="Layer_3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46.28 46.28"
              >
                <defs></defs>
                <path
                  className="cls-1"
                  d="m43.48,17.76c-1.54,0-2.8-1.26-2.8-2.8v-7.55c0-1-.81-1.81-1.81-1.81h-7.55c-1.54,0-2.8-1.26-2.8-2.8s1.26-2.8,2.8-2.8h7.55c4.09,0,7.41,3.32,7.41,7.41v7.55c0,1.54-1.26,2.8-2.8,2.8Z"
                />
                <path
                  className="cls-1"
                  d="m2.8,17.76c-1.54,0-2.8-1.26-2.8-2.8v-7.55C0,3.32,3.32,0,7.41,0h7.54c1.54,0,2.8,1.26,2.8,2.8s-1.26,2.8-2.8,2.8h-7.54c-1,0-1.81.81-1.81,1.81v7.55c0,1.54-1.26,2.8-2.8,2.8Z"
                />
                <path
                  className="cls-1"
                  d="m7.41,46.28c-4.09,0-7.41-3.32-7.41-7.41v-7.55c0-1.54,1.26-2.8,2.8-2.8s2.8,1.26,2.8,2.8v7.55c0,1,.81,1.81,1.81,1.81h7.54c1.54,0,2.8,1.26,2.8,2.8s-1.26,2.8-2.8,2.8h-7.54Z"
                />
                <path
                  className="cls-1"
                  d="m31.32,46.28c-1.54,0-2.8-1.26-2.8-2.8s1.26-2.8,2.8-2.8h7.55c1,0,1.81-.81,1.81-1.81v-7.55c0-1.54,1.26-2.8,2.8-2.8s2.8,1.26,2.8,2.8v7.55c0,4.09-3.32,7.41-7.41,7.41h-7.55Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine ag-grid-example"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          gridOptions={{ rowHeight: 32 }}
          // rowStyle={{ maxHeight: "20px", height: "10px" }}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
          // enableRangeSelection={true}
          // copyHeadersToClipboard={true}
          // rowSelection={"multiple"}
          // paginationAutoPageSize={true}
          paginationPageSize={pageSize}
        ></AgGridReact>

        <Menu
          className="page-size-menu"
          menuButton={
            <MenuButton className="page-size-btn">
              <span>Rows per page</span>
              <span className="btn">{pageSize}</span>
            </MenuButton>
          }
        >
          {pageSizes.map((size) => {
            return (
              <MenuItem
                key={size}
                onClick={() => {
                  setPageSize(size);
                }}
                style={{ background: pageSize === size ? "#f3f7ff" : "" }}
              >
                {size}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;
