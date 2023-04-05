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

const paddingSizes = [1, 2, 3];

const AllOrders = () => {
  const { data: allData } = useQuery("todos", fetch_XLSX_DATA);
  const [searchValue, setSearchValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [type, setType] = useState("By item");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [paddingSizesIndex, setPaddingSizesIndex] = useState(2);

  console.log(paddingSizesIndex);

  const ciclePaddingSizes = () => {
    let currIndex = paddingSizes.findIndex(
      (paddingSize) => paddingSize === paddingSizesIndex
    );
    let nextIndex = currIndex + 1;
    console.log(currIndex);

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
                  <MenuItem>
                    <Switch  defaultChecked />
                    Cut
                  </MenuItem>
                  <MenuItem>
                  <Switch  defaultChecked />
                    shop
                  </MenuItem>
                  {/* 1 */}
                  <MenuItem>
                  <Switch  defaultChecked />
                    Amount
                  
                  </MenuItem>
                  {/* 2 */}
                  <MenuItem>
                  <Switch  defaultChecked />
                    Scheduled
                  
                  </MenuItem>
                  {/* 3 */}
                  <MenuItem>
                  <Switch  defaultChecked />
                    Delivery Date
                  
                  </MenuItem>
                  {/* 4 */}
                  <MenuItem>
                  <Switch  defaultChecked />
                    Status
                  
                  </MenuItem>
                  <MenuItem>
                  <Switch  defaultChecked />
                    Service Level
                  
                  </MenuItem>
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
