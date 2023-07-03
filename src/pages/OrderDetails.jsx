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
import "../styles/pending-status-menu.css";

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import ExpandingInput from "../components/ExpandingInput";
import useFilterToggle from "../hooks/useFilterToggle";
import { useSearchParams } from "react-router-dom";
import AgTablePag from "../components/AgTablePag";
import useRemoveId from "../components/useRemoveId";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import LazyExcelExportBtn from "../components/LazyExcelExportBtn";
import { useMediaQuery } from "@uidotdev/usehooks";
import OrderDetailsCards from "../components/OrderDetailsCards";
const OrderDetails = () => {
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
      name: "quantity",
      showingName: "რაოდენობა",
      isShowing: true,
    },
    {
      name: "price",
      showingName: "ფასი",
      isShowing: true,
    },
    {
      name: "amount",
      showingName: "თანხა",
      isShowing: true,
    },
    {
      name: "reservedQuantity",
      showingName: "დარეზერვებული",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchParams] = useSearchParams();
  const orderID =
    searchParams.get("orderID") || "5e93afb9-87cb-49d1-8e4a-f765f8b87705";

  const url = `https://10.0.0.202:5001/api/OrderDetailsFront/${orderID}`;

  const { isLoading, error, data } = useQuery("repoData", () => fetchData(url));

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
      headerName: "ბარკოდები",
      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    },
    {
      field: "product",
      headerName: "პროდუქტი",
    },
    {
      field: "quantity",
      headerName: "რაოდენობა",
    },
    {
      field: "price",
      headerName: "ფასი",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "GEL";
      },
    },
    {
      field: "amount",
      headerName: "თანხა",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "GEL";
      },
    },
    {
      field: "reservedQuantity",
      headerName: "დარეზერვირებული ",
      cellRenderer: (params) => {
        const { value } = params;
        let color = "";
        if (params.data.redStatus) {
          color = "red";
        }
        return <span style={{ color: color }}>{value}</span>;
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

  const [rowHeightsArr, setRowHeightsArr] = ["small", "medium", "big"];
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

  // URL info
  let date = searchParams.get("date") || "01/30/2023";
  let shopAddress = searchParams.get("shop") || "რუსთაველი 01.";
  let vendor = searchParams.get("vendor") || "GDM";
  let status = searchParams.get("status") || "გაგზავნილია";

  let statusBg;
  // if (status === "In Progress") {
  //   statusBg = "#6E0FF5";
  // } else if (status === "Delivered") {
  //   statusBg = "#01C6B5";
  // } else {
  //   statusBg = "#FFC23C";
  // }

  if (status === "გაგზავნილია") {
    statusBg = "#FFC23C";
  } else if (status === "მიწოდებულია") {
    statusBg = "#01C6B5";
  } else if (status === "პროცესშია") {
    statusBg = "#6E0FF5";
  } else if (status === "დადასტურებულია") {
    statusBg = "#FF7BA7";
  }
  const [gridReady, setGridReady] = useState(false);
  useRemoveId(gridApi, gridRef);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 style={{ marginRight: 10 }}>შეკვეთის დეტალები</h4>
            <p className="discount-container">
              მომწოდებელი: <span>{vendor}</span>
            </p>
            <p className="discount-container">
              მაღაზია: <span>{shopAddress}</span>
            </p>
            <p className="discount-container">
              თარიღი: <span>{date}</span>
            </p>
            <Menu
              className="pending-status-menu"
              menuButton={
                <button
                  style={{ backgroundColor: statusBg, color: "#fff" }}
                  className="btn "
                >
                  {status}
                </button>
              }
              direction="bottom"
              align="center"
              transition
            >
              <MenuItem>Approved 11:45, 2/10/2023</MenuItem>
              <MenuItem>Recieved 11:45, 2/10/2023</MenuItem>
              <MenuItem>Sent 11:45, 2/10/2023</MenuItem>
            </Menu>
          </div>

          {isSmallDevice ? null : (
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
                        active: !headerList.every(
                          (header) => !header.isShowing
                        ),
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
              <LazyExcelExportBtn data={rowData} name="" />
            </div>
          )}
        </div>
      </header>
      {isSmallDevice ? (
        <OrderDetailsCards
          data={rowData}
          status={status}
          vendor={vendor}
          statusBg={statusBg}
          date={date}
        />
      ) : (
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example order-details-table"
          style={{ minHeight: 595, width: "100%" }}
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
            // enableRangeSelection={true}
            // copyHeadersToClipboard={true}
            // rowSelection={"multiple"}
            // paginationAutoPageSize={true}
            paginationPageSize={pageSize}
          ></AgGridReact>

          {gridReady === true && (
            <AgTablePag gridRef={gridRef} pageCount={67} />
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
      )}
    </>
  );
};

export default OrderDetails;
