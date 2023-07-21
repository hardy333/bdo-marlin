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
import "../styles/expandable-table.css";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import d from "../assets/SLAByCategory.json";

// css
import "../styles/ag-grid.css";
import CustomHeaderCell from "../components/CustomHeaderCell";
import "../styles/stable-table.css";

import Select from "react-select";

import vendorsArr from "../data/vendors-data";
import {
  categoriesColumnDefs,
  categoriesHeaders,
} from "./categories/CategoriesConfig";

import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import DatePickerInput from "../components/DatePickerInput";
import SlaMenu from "../components/SlaMenu";
import ExpandingInput from "../components/ExpandingInput";
import classNames from "classnames";
import useFilterToggle from "../hooks/useFilterToggle";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import LazyExcelExportBtn from "../components/LazyExcelExportBtn";
import SlaCategoryCards from "../components/SlaCategoryCards";

import { MaterialReactTable } from "material-react-table";
import "../styles/mui-table.css";
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

import { allData, allExpData } from "./tableData";






const CategoriesTable2 = () => {
  const [headerList, setHeaderList] = useState(categoriesHeaders);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(d.data);

  const [columnDefs] = useState(categoriesColumnDefs);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    floatingFilter: false,
    suppressMovable: false,
    width: 1385 / headerList.filter((obj) => obj.isShowing).length,
    minWidth: 150,
  }));

  const [rowHeightsArr, setRowHeightsArr] = ["small", "medium", "big"];
  const rowHeightBtnRef = useRef(null);

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

  //   const b = 201
  //   const c = 200
  //   const d = 2

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

  

  const rowHeight = useRef(null);

  const isSecondOpen = useRef(false);

  

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    gridApi.setQuickFilter(e.target.value);
  };

  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef(null);


  //   ------------------------------ //
  //   ------------------------------ //

  const [showFilters, setShowFilters] = useFilterToggle();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 530px)");

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };
  const [pageLink, setPageLink] = useState(null)

  
  const columns = useMemo(
    () => [
     
      {
        accessorKey: "productCategory",
        header: "კატეგორია",
        
      },
      {
        accessorKey: "orderedQuantity",
        header: "შეკვეთილი რაოდენობა",
       
      },
      {
        accessorKey: "orderedAmount",
        header: "შეკვეთის თანხა",
        
      },
      {
        accessorKey: "slaByQuantity",
        header: "SL. რაოდენობით",
        
      },
      {
        accessorKey: "slaByAmount",
        header: "SL. თანხით",
      },
      {
        accessorKey: "inTimeOrders",
        header: "დროულობა",
      },
    ],
    []
  );
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
      
      }),
    [globalTheme]
  );


  const fontAwesomeIcons = {
    // ArrowDownwardIcon: (props) => (
    //   <span>+++</span>
    // ),
    // ArrowDownwardIcon: () => (
    //   <span>++</span>
    // ),
    // ExpandMoreIcon: () => (
    //   <span>+</span>
    // ),
    // ExpandLessIcon: () => {
    //   <span>-</span>
    // }
  };

  return (
    <>
      <header className="all-orders__header sla-by-vendors__header sla-header">
        <div className="all-orders__settings sla-by-vendors__settings">
          {/* Left */}
          <div
            className="order-details-left sla-top"
            style={{ paddingLeft: "0", marginLeft: 0 }}
          >
            <h4 className="sla-heading categories-heading">
              <span>სერვისის დონე</span>
              <small>{pageLink}</small>
            </h4>
            <div className="sla-date">
              <div className={`flex items-center sla-date `}>
                <span className="calendar-span">
                  <DatePickerInput />
                </span>
              </div>
            </div>
            <Select
              className="react-select-container sla-select"
              classNamePrefix="react-select"
              options={vendorsArr}
              defaultValue={{ value: "მომწოდებელი 1", label: "მომწოდებელი 1" }}
            />
            {/* <ItemsMenu isSlaVendors={true} /> */}
            <SlaMenu className="sla-menu" />
            <p className="avarage-sla sla-avg sla-avg-desktop">
              ASL: <span>82%</span>
            </p>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options sla-settings">
            <p className="avarage-sla sla-avg sla-avg-mobile">
              ASL: <span>82%</span>
            </p>
            <ExpandingInput onFilterTextChange={onFilterTextChange} />

            {/* input filter */}
            <button
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              className={classNames({
                "all-orders__btn-filter": true,
                "all-orders__btn": true,
                active: showFilters,
              })}
            >
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
                        {header.name}
                      </label>
                    </div>
                  </MenuItem>
                ))}
              </div>
            </Menu>
            {/* Row height */}
            <button
              onClick={() => {
                gridRef.current.api.resetRowHeights();
                changeRowHeight();
              }}
              ref={rowHeightBtnRef}
              className="all-orders__btn sla-row-height-btn"
            >
              {rowHeightIndex === 1 ? <RowHeightSmallSvg /> : null}
              {rowHeightIndex === 2 ? <RowHeightMediumSvg /> : null}
              {rowHeightIndex === 0 ? <RowHeightBigSvg /> : null}
            </button>
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={classNames({
                "all-orders__btn": true,
                active: isFullScreen,
                "sla-expand-btn": true,
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
            <LazyExcelExportBtn data={rowData} name="sla-by-category" />
          </div>
        </div>
      </header>

      {isSmallDevice ? (
        <SlaCategoryCards pageLink={pageLink} setPageLink={setPageLink} data={rowData} />
      ) : (
        <div
          className="ag-theme-alpine stable-table expandable-table"
          style={{ minHeight: 595, width: "100%", padding: "2rem", paddingRight: "1rem", paddingBottom: "0.5rem", border: "1px solid transparent", background: "#fff", borderRadius: "15px" }}
        >
          <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={allExpData}
        enableExpanding
        getSubRows={(originalRow) => originalRow.subRows} //default, can customize

        icons={fontAwesomeIcons}
        enableSelectAll={false}
        rowSelection={false}
        enableMultiRowSelection={false}
        enableRowActions={false}
        enableRowSelection={false}
        enableHiding={false}
        enableColumnFilterModes={false}
        enablePagination={false}
        enableSorting={true}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableColumnOrdering={false}
        enableGlobalFilter={false}
        initialState={{ density: "comfortable" }}
      />
    </ThemeProvider>
        </div>
      )}
    </>
  );
};

export default CategoriesTable2;
