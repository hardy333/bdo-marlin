import React, { useEffect, useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";

// images
import arrowLeft from "../assets/all-orders/arrow-left.svg";
import expand from "../assets/all-orders/expand.svg";
import filter from "../assets/all-orders/filter.svg";
import search from "../assets/all-orders/search.svg";
import x from "../assets/all-orders/x.svg";
import cardPink from "../assets/all-orders/car-pink.svg";
import burgerLines from "../assets/all-orders/view-list.svg";
import classNames from "classnames";
import { Switch } from "@mui/material";
import { COLUMNS_BY_ITEM } from "../columns";

const paddingSizes = [1, 2, 3];

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import DashboardLayout from "../layout/DashboardLayout";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

const AgTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [type, setType] = useState("By item");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [paddingSizesIndex, setPaddingSizesIndex] = useState(2);
  const [headerList, setHeaderList] = useState(
    COLUMNS_BY_ITEM.map((column) => column.Header)
  );
  const [hiddenHeadersList, sethiddenHeadersList] = useState(() => {
    const obj = {};
    headerList.forEach((h) => {
      obj[h] = false;
    });

    return obj;
  });

  const [arr, setArr] = useState([]);

  const ciclePaddingSizes = () => {
    let currIndex = paddingSizes.findIndex(
      (paddingSize) => paddingSize === paddingSizesIndex
    );
    let nextIndex = currIndex + 1;

    if (nextIndex > paddingSizes.length - 1) {
      setPaddingSizesIndex(paddingSizes[0]);
    } else {
      setPaddingSizesIndex(paddingSizes[nextIndex]);
    }
  };
  //
  //
  //
  //

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    {
      field: "Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Item",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Ordered",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Delivered",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "In time",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Service level",
      minWidth: 150,
      flex: 1,
    },
    // {
    //   field: "Product category",
    // },
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
      <header className="all-orders__header">
        <div className="all-orders__arrow-container">
          <img src={arrowLeft} alt="" />
          <span>All Orders</span>
        </div>
        <div className="all-orders__settings">
          {/* Left */}
          <div className="all-orders__gdm-container">
            <img src={cardPink} alt="" />
            <span>GDM</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <div className="all-orders__input-wrapper">
              <label htmlFor="all-orders-input">
                <img src={search} className="all-orders__input-img" />
              </label>
              <input
                id="all-orders-input"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="all-orders__input"
              />
            </div>
            {/* input filter */}
            <button
              onClick={() => setShowInputs(!showInputs)}
              className="all-orders__btn"
            >
              <img src={filter} alt="" />
            </button>
            {/* popup */}
            {/* <button className="all-orders__btn ">
                </button> */}
            <Menu
              align="center"
              direction="top"
              menuButton={
                <MenuButton className="all-orders__btn ">
                  <img src={burgerLines} alt="" className="flip transparent" />
                </MenuButton>
              }
              transition
            >
              {headerList.map((header) => (
                <MenuItem
                  key={header}
                  value={header}
                  onClick={(e) => {
                    // Stop the `onItemClick` of root menu component from firing
                    // e.stopPropagation = true;
                    // Keep the menu open after this menu item is clicked
                    e.keepOpen = true;

                    if (hiddenHeadersList[e.value]) {
                      sethiddenHeadersList({
                        ...hiddenHeadersList,
                        [e.value]: false,
                      });
                    } else {
                      sethiddenHeadersList({
                        ...hiddenHeadersList,
                        [e.value]: true,
                      });
                    }

                    let newArr = [];

                    for (let [key, value] of Object.entries(
                      hiddenHeadersList
                    )) {
                      if (value) {
                        newArr.push(key);
                      }
                    }

                    setArr(newArr);
                  }}
                >
                  <Switch defaultChecked />
                  {header}
                </MenuItem>
              ))}
            </Menu>
            {/* padding */}
            <button onClick={ciclePaddingSizes} className="all-orders__btn">
              <img src={burgerLines} alt="" className="transparent" />
            </button>
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="all-orders__btn"
            >
              <img src={expand} alt="" />
            </button>
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine ag-grid-example"
        style={{ height: 485, width: "100%" }}
      >
        <AgGridReact
          rowStyle={{ maxHeight: "40px", height: "40px" }}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          // paginationAutoPageSize={true}
          paginationPageSize={13}
        ></AgGridReact>
      </div>
    </DashboardLayout>
  );
};

export default AgTable;
