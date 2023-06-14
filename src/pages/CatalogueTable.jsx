import React, { useEffect, useMemo, useRef, useState } from "react";
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
import "../styles/pending-status-menu.css";

// images

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];
import "../styles/catalogue.css";

import { items1 } from "./Test";

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

// import d from "../assets/CATALOGUE_MOCK_DATA.json";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import ExpandingInput from "../components/ExpandingInput";

import useFilterToggle from "../hooks/useFilterToggle";
import fetch_XLSX_DATA2 from "../utils/getData2";
import AgTablePag from "../components/AgTablePag";
import CatalogueMenu from "../components/CatalogueMenu";
import useRemoveId from "../components/useRemoveId";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";
import TriangleSvg from "../components/svgs/TriangleSvg";
import { useQuery } from "react-query";
import { getData } from "./Test3";
import ProgressBar from "../components/ProgressBar";

const CatalogueTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "barcode",
      showingName: "ბარკოდი",
      isShowing: true,
    },
    {
      name: "product",
      showingName: "პროდუქტი",
      isShowing: true,
    },
    {
      name: "unit",
      showingName: "ერთეული",
      isShowing: true,
    },
    {
      name: "price",
      showingName: "ფასი",
      isShowing: true,
    },
    {
      name: "lastOrderPrice",
      showingName: "წინა ფასი",
      isShowing: true,
    },
    {
      name: "lastChangeDate",
      showingName: "ცვლილების თარიღი ",
      isShowing: true,
    },
    {
      name: "status",
      showingName: "სტატუსი",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [subCatId, setSubCatId] = useState(
    "e1307628-f308-11ed-8120-005056b5a0aa"
  );


  const url = `https://10.0.0.202:5001/api/CatalogueFront/M00001/${subCatId}`;

  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ["catalogueTableData", subCatId],
    () => getData(url)
  );


  useEffect(() => {
    refetch();
  }, [subCatId]);

  const [rowData, setRowData] = useState(() => {
    if (data || data?.data) {
      return data.data;
    }
    return null;
  });

  useEffect(() => {
    if (!data) return;
    if (isLoading) return;
    if (error) return;
    setRowData(data.data);
  }, [data, isLoading, error]);

  const [columnDefs] = useState([
    {
      field: "barcode",
      headerName: "ბარკოდი",
    },
    {
      field: "product",
      headerName: "პროდუქტი",
      minWidth: 200,

      cellRenderer: (params) => {
        const { value } = params;

        return params.value;
      },
    },
    {
      field: "unit",
      headerName: "ერთეული",
      maxWidth: 150,
    },
    {
      field: "price",
      headerName: "ფასი",
      maxWidth: 150,

      cellRenderer: (params) => {
        const { value } = params;

        return value + " " + "GEL";
      },
    },
    {
      field: "lastOrderPrice",
      headerName: "წინა ფასი",
      cellRenderer: (params) => {
        const { value } = params;

        let newVal = value;
        let up = false;
        if (Math.random() - 0.33 < 0) {
          newVal = value + 1;
          up = true;
        }

        return (
          <div
            style={{ height: "100%", display: "flex" }}
            className="items-center  gap-4 pe-20"
          >
            <span style={{ width: "50px" }}>{newVal + " " + "GEL"}</span>
            <TriangleSvg
              fill={up ? "#FF3360" : "#6E0FF5"}
              style={{
                transform: up ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "lastChangeDate",
      headerName: "ცვლილების თარიღი",
    },
    {
      field: "status",
      headerName: "სტატუსი",
      cellRenderer: ({ value }) => {
        let color = "";
        if (value === "აქტიური") {
          color = "#6E0FF5";
        } else if (value === "გაუქმებული") {
          color = "#FF3360";
        } else if (value === "მიუწვდომელი") {
          color = "#FFA23C";
        }
        return (
          <div className="flex items-center" style={{ height: "100%" }}>
            <button
              style={{ color: color }}
              className=" flex items-center px-2 rounded-3xl capitalize text-white p-0 text h-[16px] "
            >
              {value}
            </button>
          </div>
        );
      },
    },
  ]);

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
      floatingFilter: true,
      suppressMovable: true,
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

    setGridReady(true);
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

  // Row Height logic
  // Row Height logic

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
  const gridRef = useRef(null);

  const [showFilters, setShowFilters] = useFilterToggle();
  // --------//
  // --------//
  const [isHover, setIsHover] = useState(false);
  const [isSectionHover, setIsSectionHover] = useState(false);

  const c = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      return items1[Math.floor(Math.random() * items1.length)];
    });
  }, []);

  const disableHoverAsync = () => {
    setIsHover(false);
  };

  const [isChecked, setISChecked] = useState(false);

  const [gridReady, setGridReady] = useState(false);

  useRemoveId(gridApi, gridRef);

  return (
    <>
      <header className="all-orders__header catalogue-header" style={{position: "relative"}}>
      <ProgressBar show={isFetching} />

        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4>კატალოგი</h4>

            <div className="vendors-switch-container">
              <p className="catalogue-label">ჩემი პროდუქტები</p>
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  checked={isChecked}
                  onChange={() => setISChecked(!isChecked)}
                  id="toggle"
                  type="checkbox"
                />
                <label className="toggle-label" htmlFor="toggle"></label>
              </div>
              <p className="catalogue-label">ყველა პროდუქტი</p>
            </div>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
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
                active: isFullScreen,
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
            <button
              className="all-orders__btn excel-export-btn"
              onClick={() => exportData(rowData, "catalogue")}
            >
              <ExcelExportSvg />
            </button>
          </div>
        </div>
      </header>
      <div className="flex gap-2">
        {/* Categories */}
        <div className="catalogue-menu-container">
          <CatalogueMenu setSubCatId={setSubCatId} />
        </div>
        
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example"
          style={{ minHeight: 595, width: "100%", position: "relative" }}
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

          {gridReady === true && (
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(92 / pageSize)}
            />
          )}

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
      </div>
    </>
  );
};

export default CatalogueTable;
