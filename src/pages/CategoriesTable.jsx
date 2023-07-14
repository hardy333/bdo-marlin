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
import Select from "react-select";
import vendorsArr from "../data/vendors-data";
import ExpandingInput from "../components/ExpandingInput";
import classNames from "classnames";

import useFilterToggle from "../hooks/useFilterToggle";

// css
import "../styles/ag-grid.css";
import CustomHeaderCell from "../components/CustomHeaderCell";
import "../styles/stable-table.css";

import d from "../assets/SLAByCategory.json";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import SlaMenu from "../components/SlaMenu";
import DatePickerInput from "../components/DatePickerInput";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import ExpandSvg from "../components/ExpandSvg";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";


const CategoriesTable = () => {
  const [headerList, setHeaderList] = useState([
    {
      name: "Vendors",
      isShowing: true,
    },
    {
      name: "Monthly Amount",
      isShowing: true,
    },
    {
      name: "Quantity Deviation",
      isShowing: true,
    },
    {
      name: "In Time Orders",
      isShowing: true,
    },
    {
      name: "Avarage Service Level",
      isShowing: true,
    },
  ]);
  const [showFilters, setShowFilters] = useFilterToggle();

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(d.data);

  console.log(rowData);

  
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

  const [isFullScreen, setIsFullScreen] = useState(false);

  const hideAllColumns = () => {
    setHeaderList(
      headerList.map((header) => ({ ...header, isShowing: false }))
    );
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, false);
    });
  };

  const [rowHeightIndex, setRowHeightIndex] = useState(1);
  const rowHeightBtnRef = useRef(null);

  const showAllColumns = () => {
    setHeaderList(headerList.map((header) => ({ ...header, isShowing: true })));
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, true);
    });
  };

  const [columnDefs] = useState([
    {
      field: "productCategory",
      headerName: "კატეგორია",
      cellRenderer: (props) => {
        const { value } = props;
        return (
          <div>
            <span className="plus-minus-span">+</span>
            <span>{value}</span>
            <div className="custom-col-container"></div>
          </div>
        );
      },
    },
    {
      field: "orderedQuantity",
      headerName: "შეკვეთილი რაოდენობა",
      cellRenderer: (props) => {
        const { value } = props;
        return (
          <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
          </div>
        );
      },
    },
    {
      field: "orderedAmount",
      headerName: "შეკვეთის თანხა",
      cellRenderer: (props) => {
        const { value } = props;
        return (
          <div>
            <span>{value} GEL</span>
            <div className="custom-col-container"></div>
          </div>
        );
      },
    },
    {
      field: "slaByQuantity",
      headerName: "SL. რაოდენობით",
      cellRenderer: (props) => {
        const { value } = props;
        return (
          <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
          </div>
        );
      },
    },
    {
      field: "slaByAmount",
      headerName: "SL. თანხით",
      cellRenderer: (props) => {
        const { value } = props;
        return (
          <div>
            <span>{value} GEL</span>
            <div className="custom-col-container"></div>
          </div>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    floatingFilter: false,
    suppressMovable: false,
    width: 1385 / headerList.filter((obj) => obj.isShowing).length,
    minWidth: 150,
  }));

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

  // Expandable logic 11
  // Expandable logic 11
  const renderSubTable = () => {
    rowData.forEach((obj, rowIndex) => {
      const val1 = obj["productCategory"];
      const val2 = obj["orderedQuantity"];
      const val3 = obj["orderedAmount"];
      const val4 = obj["slaByQuantity"];
      const val5 = obj["slaByAmount"];

      const arr = [val1, val2, val3, val4, val5];

      const cells = expandedRow.current.querySelectorAll(".ag-cell");

      cells.forEach((cell, index) => {
        const columnContainer = cell.querySelector(".custom-col-container");

        const newCell = document.createElement("DIV");
        newCell.setAttribute("data-index", rowIndex);

        if (index === 0) {
          newCell.innerHTML = `
          <div class="plus-minus-span-wrapper">
            <span  class="plus-minus-span plus-minus-span-2" style="padding-right: 10px;">+</span> ${arr[index]}
          </div>
          `;
        } else {
          newCell.textContent = arr[index];
        }

        columnContainer.append(newCell);
      });
    });
  };

  const rowHeight = useRef(null);

  const isSecondOpen = useRef(false);

  // Second Actions 22
  // Second Actions 22
  const renderSecondTable = (targetSpan) => {
    const text = targetSpan.textContent;

    const rowIndex =
      targetSpan.parentElement.parentElement.getAttribute("data-index");

    const rowCells = document.querySelectorAll(`div[data-index='${rowIndex}']`);

    if (text === "-") {
      targetSpan.textContent = "+";
      isSecondOpen.current = false;

      rowCells.forEach((rowCell) => {
        rowCell.style.height = "40px";
        // rowCell.style.overflow = "hidden";
      });
      rowHeight.current = null;
      removeSecondSubTable();
      gridApi.resetRowHeights();
      return;
    } else {
      targetSpan.textContent = "-";
      isSecondOpen.current = true;

      let newHeight = (rowData.length + 1) * 40;

      rowCells.forEach((rowCell) => {
        rowCell.style.height = newHeight + "px";
        // rowCell.style.overflow = "hidden";
      });
      rowHeight.current = newHeight + (rowData.length + 1) * 40;
      gridApi.resetRowHeights();
    }

    // return
    rowData.forEach((obj, index) => {
      const val1 = obj["productCategory"];
      const val2 = obj["orderedQuantity"];
      const val3 = obj["orderedAmount"];
      const val4 = obj["slaByQuantity"];
      const val5 = obj["slaByAmount"];
      
      const arr = [val1, val2, val3, val4, val5];

      rowCells.forEach((cell, index) => {
        const newCell = document.createElement("DIV");
        // newCell.style.border ="1px solid green";
        newCell.style.paddingLeft = "20px";
        newCell.classList.add("second-sub-table-cell");

        if (index === 0) {
          newCell.innerHTML = `
          <div class="plus-minus-span-wrapper second-child-table-line" style="padding-left: 30px;" >
            ${arr[index]}
          </div>
          `;
        } else {
          newCell.textContent = arr[index];
        }

        cell.append(newCell);
      });
    });
  };

  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef(null);
  const expandedRow = useRef(null);
  const expandedRowId = useRef(null);

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    gridApi.setQuickFilter(e.target.value);
  };

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);


  // Click Logic
  // Click Logic
  useEffect(() => {
    const tBody = document.querySelector(".expandable-table .ag-body");

    if (!tBody) return;

    const handleGridClick = (e) => {
      const target = e.target;
      if (!target.classList.contains("plus-minus-span")) {
        return;
      }

      if (target.classList.contains("plus-minus-span-2")) {
        renderSecondTable(target);
        return;
      }

      const cell = target.closest(".ag-cell");
      const row = target.closest(".ag-row");
      const rowId = +row.getAttribute("row-id");

      const colName = cell.getAttribute("col-id");

      if (expandedRowId.current === rowId) {
        expandedRow.current = null;
        expandedRowId.current = null;
        row.querySelector(".plus-minus-span").textContent = "+";
        row.classList.remove("opened");

        rowHeight.current = null;

        removeFirstSubTable();
      } else {
        // closePrevFirstSubTable(row)
        expandedRow.current = row;
        expandedRowId.current = rowId;
        row.querySelector(".plus-minus-span").innerHTML = "-";
        row.classList.add("opened");
        renderSubTable();
      }

      gridRef.current.api.resetRowHeights();
    };

    tBody.addEventListener("click", handleGridClick);

    return () => {
      tBody.removeEventListener("click", handleGridClick);
    };
  }, [gridApi]);

  const removeFirstSubTable = () => {
    const cols = document.querySelectorAll(".custom-col-container");
    cols.forEach((col) => (col.innerHTML = ""));
  };

  const removeSecondSubTable = () => {
    const cells = document.querySelectorAll(".second-sub-table-cell");
    cells.forEach((cell) => cell.remove());
    console.log(cells);
  };

  const closePrevFirstSubTable = (row) => {
    if (!row) return;
    if (!expandedRow.current) return;

    expandedRow.current = null;
    expandedRowId.current = null;
    row.querySelector(".plus-minus-span").textContent = "+";
    row.classList.remove("opened");

    removeFirstSubTable();
    gridRef.current.api.resetRowHeights();
  };

  const closePrevSecondSubTable = () => {};

  return (
    <>
      <header className="all-orders__header">
      <div className="all-orders__settings sla-by-vendors__settings">
          {/* Left */}
          <div
            className="order-details-left sla-top"
            style={{ paddingLeft: "0", marginLeft: 0 }}
          >
            <h4 className="sla-heading">სერვისის დონე</h4>
            <div className="sla-date">
              <div className={`flex items-center sla-date `}>
                <span
                
                  className="calendar-span"
                >
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
          <div className="all-orders__settings__options">
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
              className="all-orders__btn"
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
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
            <button
              className="all-orders__btn excel-export-btn"
              onClick={() => exportData(rowData)}
            >
              <ExcelExportSvg />
            </button>
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine stable-table expandable-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressHorizontalScroll={true}
          components={components}
          getRowHeight={(params) => {
            const { id } = params.node;

            if (id == expandedRowId.current) {
              if (isSecondOpen.current) {
                if (rowHeight.current) {
                  return rowHeight.current;
                }
              }
              return (rowData.length + 1) * 41.6;
            }
          }}
        ></AgGridReact>
      </div>
    </>
  );
};

export default CategoriesTable;
