import React, { useState } from "react";
import { useQuery } from "react-query";
import DashboardAside from "../components/DashboardAside";
import Loader from "../components/Loader";
import Table from "../components/Table";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSettings from "../components/DashboardSettings";
import * as XLSX from "xlsx";
import fetch_XLSX_DATA from "../utils/getData.js";
import OrdersTable from "../components/OrdersTable";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
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

const AllOrders = () => {
  const { data: allData } = useQuery("todos", fetch_XLSX_DATA);
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

  console.log("A:", hiddenHeadersList);

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

  return (
    <div className="dashboard all-orders">
      <DashboardAside />
      <DashboardNavbar />
      <main
        className={classNames({
          "dashboard-main": true,
          "dashboard-main--fullscreen": isFullScreen,
        })}
      >
        <div className="dashboard-main__container">
          <header className="all-orders__header">
            <div className="all-orders__arrow-container">
              <img src={arrowLeft} alt="" />
              <span>All Orders 123 123 123</span>
            </div>
            <div className="all-orders__settings">
              {/* Left */}
              <div className="all-orders__gdm-container">
                <img src={cardPink} alt="" />
                <span>GDM123</span>
              </div>
              {/* Right */}
              <div className="all-orders__settings__options">
                <div className="all-orders__input-wrapper">
                  <input
                    id="all-orders-input"
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
                      <img
                        src={burgerLines}
                        alt=""
                        className="flip transparent"
                      />
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
          {allData ? (
            <OrdersTable
              searchValue={searchValue}
              tableData={allData[type]}
              isSorting={isSorting}
              showInputs={showInputs}
              paddingSizesIndex={paddingSizesIndex}
              hiddenHeadersList={hiddenHeadersList}
              arr={arr}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <Loader />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllOrders;
