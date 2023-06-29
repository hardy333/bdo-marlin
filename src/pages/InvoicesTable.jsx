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
import "../styles/invoices-table.css";

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import ExpandingInput from "../components/ExpandingInput";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import ColumnHideSvg from "../components/ColumnHideSvg";
import FilterSvg from "../components/FilterSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";

import d from "../assets/invoices.json";
import FourDotsSvg from "../components/FourDotsSvg";
import { useNavigate } from "react-router-dom";
import useFilterToggle from "../hooks/useFilterToggle";
import useRemoveId from "../components/useRemoveId";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";
import vendorsArr from "../data/vendors-data";

const InvoicesTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBigRow, setIsBigRow] = useState(true);

  const [headerList, setHeaderList] = useState([
    {
      showingName: "თარიღი",
      name: "Date",
      isShowing: true,
    },
    {
      showingName: "ზედნადები",
      name: "Waybill #",
      isShowing: true,
    },
    {
      showingName: "დოკუმენტის #",
      name: "Documnet #",
      isShowing: true,
    },
    {
      showingName: "მომწოდებელი",
      name: "Vendor",
      isShowing: true,
    },
    {
      showingName: "მაღაზია",
      name: "Shop",
      isShowing: true,
    },
    {
      showingName: "რაოდენობა",
      name: "Amount",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d);

  const gridRef = useRef(null);

  const [columnDefs] = useState([
    {
      field: "Date",
      headerName: "თარიღი",
    },
    {
      field: "Waybill #",
      headerName: "ზედნადები",
    },
    {
      field: "Documnet #",
      headerName: "დოკუმენტის #",
    },
    {
      field: "Vendor",
      headerName: "მომწოდებელი",
      cellRenderer: (params) => {
        return vendorsArr[Math.floor(Math.random() * vendorsArr.length)].value;
      },
    },
    {
      field: "Shop",
      headerName: "მაღაზია",
    },
    {
      field: "Amount",
      headerName: "რაოდენობა",

      cellRenderer: (params) => {
        let { value } = params;
        if (!value) value = 10;
        return value + " " + "GEL";
      },
    },
    {
      field: "Status",
      headerName: "სტატუსი",
      hide: true,
      cellRenderer: (params) => {
        const { value } = params;
        const x = Number(value);
        if (!value || x % 2 === 0)
          return (
            <button className="invoices-table-status-btn invoices-table-status-btn--danger ">
              To be paid
            </button>
          );
        return (
          <button className="invoices-table-status-btn invoices-table-status-btn--success">
            Paid
          </button>
        );
      },
    },
  ]);

  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

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
      floatingFilterComponent: CustomInput,
    }),
    [showingFloatingFilter]
  );

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridRef.current.api.resetRowHeights();
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

  const rowHeightBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      rowHeightBtnRef.current.click();
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };

  const [showFilters, setShowFilters] = useFilterToggle();
  const navigate = useNavigate();

  useEffect(() => {
    const x = document.querySelector(
      ".invoices-table .ag-center-cols-container"
    );

    if (!x) return;

    const handleGridClick = (e) => {
      const t = e.target;
      const row = t.closest(".ag-row");

      navigate(`/invoice-details`);
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  }, [gridApi, gridRef]);

  useRemoveId(gridApi, gridRef);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        <div className="all-orders__settings settings-container-responsive">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <span className={`${isSearchOpen ? "hide" : ""}`}>ინვოისები</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            {/* <img src={search} alt="" /> */}
            <ExpandingInput
              setIsSearchOpen={setIsSearchOpen}
              onFilterTextChange={onFilterTextChange}
            />
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
              <FilterSvg />
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
                        {header.showingName}
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
                // active: isFullScreen,
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
            {/* Show Grid */}
            <button
              className="all-orders__btn"
              onClick={() => {
                navigate("/invoices2");
              }}
            >
              <FourDotsSvg fill="#D0C7E8" />
            </button>
            <button
              className="all-orders__btn excel-export-btn"
              onClick={() => exportData(rowData, "invoices")}
            >
              <ExcelExportSvg />
            </button>
          </div>
        </div>
      </header>
      <div
        id="marlin-table"
        className="ag-theme-alpine ag-grid-example invoices-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          // gridOptions={{ rowHeight: 32 }}
          ref={gridRef}
          // animateRows={true}
          getRowHeight={() => {
            if (rowHeightIndex === 0) {
              return 25;
            } else if (rowHeightIndex === 1) {
              return 32;
            } else if (rowHeightIndex === 2) {
              return 37;
            }
          }}
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
    </>
  );
};

export default InvoicesTable;
