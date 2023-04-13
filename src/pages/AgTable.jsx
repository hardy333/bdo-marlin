import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const paddingSizes = [1, 2, 3];

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import DashboardLayout from "../layout/DashboardLayout";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

const AgTable = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "Number",
      isShowing: true,
    },
    {
      name: "Item",
      isShowing: true,
    },
    {
      name: "Ordered",
      isShowing: true,
    },
    {
      name: "Delivered",
      isShowing: true,
    },
    {
      name: "In time",
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
      field: "Number",
      // cellRendererFramework: (params) => {
      //   return <div>Hello</div>;
      // },
    },
    {
      field: "Item",
    },
    {
      field: "Ordered",
      cellStyle: (params) => ({ color: +params.value > 800 ? "" : "#F55364" }),
    },
    {
      field: "Delivered",
    },
    {
      field: "In time",
      cellStyle: (params) => {
        if (params.value === "Yes") {
          return {
            color: "#FFC23C",
            fontWeight: 600,
          };
        } else {
          return {
            color: "#6E0FF5",
            fontWeight: 600,
          };
        }
      },
    },
    {
      field: "Service level",
      minWidth: 150,
      hide: true,
    },
  ]);
  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);

  const defaultColDef = useMemo(() => ({
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
  }));

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextChange = (e) => {
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

  const sortByAthleteDesc = () => {
    gridColumnApi.applyColumnState({
      state: [{ colId: "Number", sort: "desc" }],
      defaultState: { sort: null },
    });
  };

  return (
    <DashboardLayout>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container">
          <img
            src={arrowLeft}
            alt=""
            style={{
              height: "17px",
              marginRight: 10,
              marginLeft: 10,
              cursor: "pointer",
            }}
          />
          <span>All Orders</span>
          {/* <button onClick={sortByAthleteDesc}>Toggle column</button> */}
        </div>
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <img src={cardPink} alt="" />
            <span>GDM</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <div className="all-orders__input-wrapper">
              <label htmlFor="global-filter">
                <img src={search} className="all-orders__input-img" />
              </label>
              <div className="global-filter-input-wrapper">
                <input
                  id="global-filter"
                  placeholder="Search"
                  onChange={onFilterTextChange}
                  type="text"
                  className="all-orders__input global-filter-input"
                />
              </div>
            </div>
            {/* input filter */}
            <button
              onClick={() => {
                setShowingFloatingFilter((c) => !c);
                document
                  .querySelector(".ag-header-row-column-filter")
                  .classList.toggle("hide");
              }}
              className="all-orders__btn all-orders__btn-filter"
            >
              <img src={filterSvg} alt="" />
            </button>
            {/* popup */}
            <Menu
              align="center"
              direction="top"
              menuButton={
                <MenuButton className="all-orders__btn ">
                  <img src={optionsLines} alt="" className="flip transparent" />
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
              <img src={horizontalLines} alt="" className="transparent" />
            </button>
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="all-orders__btn"
            >
              <img src={expandSvg} alt="" />
            </button>
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine ag-grid-example"
        style={{ height: 480, width: "100%" }}
      >
        <AgGridReact
          // rowStyle={{ maxHeight: "40px", height: "40px" }}
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
          paginationPageSize={15}
        ></AgGridReact>
      </div>
    </DashboardLayout>
  );
};

export default AgTable;
