import React, { Suspense, useEffect, useRef, useState } from "react";
import ExpandingInput from "../components/ExpandingInput";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import FilterSvg from "../components/FilterSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import useFilterToggle from "../hooks/useFilterToggle";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

import classNames from "classnames";

import Tippy from "@tippyjs/react";
import LazyExcelExportBtn from "./LazyExcelExportBtn";

const TableSettings = ({
  isSmallDevice,
  setIsSearchOpen,
  gridApi,
  defHeaderList,
  rowData,
  gridRef,
  gridColumnApi,
  rowHeightIndex,
  setRowHeightIndex,
  pageName = "data",
  isLargeHeader = false
}) => {
  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [headerList, setHeaderList] = useState(defHeaderList);

  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add("dashboard-main-fullscreen");
    } else {
      document.body.classList.remove("dashboard-main-fullscreen");
    }
  }, [isFullScreen]);

  const rowHeightBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      rowHeightBtnRef.current.click();
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, []);

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

  const [showFilters, setShowFilters] = useFilterToggle(isLargeHeader);

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };

  return (
    <>
      {/* Expand Input */}
     
      <ExpandingInput
      useTippy={true}
        setIsSearchOpen={setIsSearchOpen}
        onFilterTextChange={onFilterTextChange}
      />
    
      {/* input filter */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="top"
        content="სვეტების ფილტრაცია"
      >
        <button
          onClick={() => {
            setShowFilters(!showFilters);
          }}
          className={classNames({
            "all-orders__btn-filter": true,
            "all-orders__btn": true,
            active: showFilters,
          })}
          style={{display: isSmallDevice ?  "none" : ""}}
        >
          <FilterSvg />
        </button>
      </Tippy>
      {/* popup */}

      <Menu
        align="center"
        direction="top"
        menuButton={
          <MenuButton 
          style={{display: isSmallDevice ?  "none" : ""}}

          className="all-orders__btn ">
            <Tippy
              className="tooltip-1"
              arrow={false}
              placement="top"
              content="სვეტების გათიშვა"
            >
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
            </Tippy>
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
          {headerList.map((header, index) => (
            <MenuItem
              key={header.name + index}
              value={header.name}
              onClick={(e) => {
                // Stop the `onItemClick` of root menu component from firing
                // e.stopPropagation = true;
                // Keep the menu open after this menu item is clicked
                e.keepOpen = true;
              }}
            >
              <div className="switch">
                <input
                  checked={header.isShowing}
                  type="checkbox"
                  id={header.name}
                  className="switch__input"
                  onChange={() => {
                    toggleColumn(header.name);
                  }}
                />
                <label htmlFor={header.name} className="switch__label">
                  {header.showingName}
                </label>
              </div>
            </MenuItem>
          ))}
        </div>
      </Menu>
      {/* Row height */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="top"
        content="სტრიქონების სიმაღლე"
      >
        <button
          style={{display: isSmallDevice ?  "none" : ""}}

          onClick={() => {
            gridRef.current?.api.resetRowHeights();
            changeRowHeight();
          }}
          ref={rowHeightBtnRef}
          className="all-orders__btn"
        >
          {rowHeightIndex === 1 ? <RowHeightSmallSvg /> : null}
          {rowHeightIndex === 2 ? <RowHeightMediumSvg /> : null}
          {rowHeightIndex === 0 ? <RowHeightBigSvg /> : null}
        </button>
      </Tippy>
      {/* expand */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="top"
        content="გადიდება"
      >
        <button
          style={{display: isSmallDevice ?  "none" : ""}}

          onClick={() => setIsFullScreen(!isFullScreen)}
          className={classNames({
            "all-orders__btn": true,
          })}
        >
          {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
        </button>
      </Tippy>
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="top"
        content="ექსელში ექსპორტი"
      >
        <LazyExcelExportBtn data={rowData} name={pageName} />
      </Tippy>
    </>
  );
};

export default TableSettings;
