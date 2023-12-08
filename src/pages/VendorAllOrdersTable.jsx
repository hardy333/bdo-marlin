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

import "../styles/all-orders-parent.css";
import "../styles/vendor-orders-table.css";

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
import FilterSvg from "../components/FilterSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import useFilterToggle from "../hooks/useFilterToggle";

// import d from "../assets/ALL_ORDERS_PARENT_MOCK_DATA .json";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import { useMediaQuery } from "@uidotdev/usehooks";
import VendorAllOrdersCards from "../components/VendorAllOrdersCards";
import useCopyTable from "../hooks/useCopyTable";
import useVendorOrdersNavigate from "../hooks/useVendorOrdersNavigate";
import AgTablePag from "../components/AgTablePag";
import { useAuthContext } from "../hooks/useAuthContext";
import useOrdersNavigate from "../hooks/useOrdersNavigate";

const VendorAllOrdersTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "shop",
      showingName: "მაღაზია",
      isShowing: true,
    },
    {
      name: "amount",
      showingName: "თანხა",
      isShowing: true,
    },
    {
      name: "scheduled",
      showingName: "გეგმიური მიწოდება",
      isShowing: true,
    },
    {
      name: "status",
      showingName: "სტატუსი",
      isShowing: true,
    },
    {
      name: "serviceLevel",
      showingName: "სერვისის დონე",
      isShowing: true,
    },
  ]);
  
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const gridRef = useRef(null);
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();

  let vendor = searchParams.get("vendor") || "";

  let vendorID = "D00002";
  if (vendor === "GDM") {
    vendorID = "D00002";
  } else if (vendor === "ნიცა") {
    vendorID = "D00003";
  }

  const url = `https://api.marlin.ge/api/RetailOrdersByAccountAndVendorFront/${user.decodedToken.AccountID}/${vendorID}`;

  const { isLoading, error, data } = useQuery({
    queryKey: "r-repoData",
    queryFn: () => fetchData(url),
    onSuccess: (data) =>{
      console.log({data})
      
    },
    select: (data) => {
      return data.data.data
    },
  });


  console.log("hello", data)

  const [columnDefs] = useState([
    {
      field: "shop",
      headerName: "მაღაზია",
      cellRenderer: (params) => {
        const { value } = params;
        return (
          <span
            // data-invoice-number={data.invoiceNumber}
            data-invoice-amount={params.data.invoiceAmount}
            data-date={params.data.date}
            // data-invoice-id={data.invoiceID}
            data-order-id={params.data.orderID}
          >
            {value}
          </span>
        );
      },
    },
    {
      field: "amount",
      headerName: "თანხა",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " GEL";
      },
    },
    {
      field: "scheduled",
      headerName: "გეგმიური მიწოდება",
      cellRenderer: (params) => {
        const { value } = params;
        if (!value) return "";
        return value.split(" ")[0].split("-").reverse().join("/");
      },
    },

    {
      field: "status",
      headerName: "სტატუსი",

      minWidth: 190,
      maxWidth: 200,
      cellRenderer: (params) => {
        const { value } = params;
        let color = "";

        if (value === "გაგზავნილია") {
          color = "#FFC23C";
        } else if (value === "მიწოდებულია") {
          color = "#01C6B5";
        } else if (value === "პროცესშია") {
          color = "#6E0FF5";
        } else if (value === "დადასტურებულია") {
          color = "#FF7BA7";
        }

        return (
          <>
            <span
              className="ag-cell-status-value"
              style={{ pointerEvents: "none", color }}
            >
              {value}
            </span>
            <div className="status-container" style={{ pointerEvents: "none" }}>
              <ul>
                <li style={{ color }}>{value}</li>
                <li>პროცესშია 11:06, 2/10/2023</li>
                <li>მიღებულია 11:06, 2/10/2023</li>
                <li>მიწოდებულია 11:06, 2/10/2023</li>
              </ul>
            </div>
          </>
        );
      },

      cellStyle: (params) => {
        if (params.value % 3 === 0) {
          return {
            color: "#FFC23C",
          };
        } else if (params.value % 3 === 1) {
          return {
            color: "#6E0FF5",
          };
        } else {
          return {
            color: "#01C6B5",
          };
        }
      },
    },
    {
      field: "serviceLevel",
      headerName: "სერვისის დონე",
      cellRenderer: (params) => {
        const { value } = params;
        return value;
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

  // Status Click
  // Status Click
  const [openedRowId, setOpenedRowId] = useState(null);

  useVendorOrdersNavigate(gridApi, gridRef, setOpenedRowId);
  // useOrdersNavigate(gridApi, gridRef, setOpenedRowId);

  useEffect(() => {
    if (!gridRef.current) return;
    if (!gridApi) return;
    gridRef.current.api.resetRowHeights();
  }, [openedRowId, gridRef, gridApi]);

  function getRowHeight(params) {
    const { id } = params.node;
    if (id == openedRowId) {
      return 140;
    }
    return 32;
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");

  const [gridReady, setGridReady] = useState(false);

  useCopyTable(gridReady);

  return (
    <>
      <header className="all-orders__header vendor-all-orders">
        <div className="all-orders__arrow-container"></div>
        <div className="all-orders__settings settings-container-responsive">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <span className={`${isSearchOpen ? "hide" : ""} heading`}>
              <span className="heading__left">ყველა შეკვეთა:</span>
              <span className="heading__right" style={{ color: "#6E0FF5" }}>
                {" "}
                {vendor}
              </span>
            </span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
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
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={classNames({
                "all-orders__btn": true,
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
          </div>
        </div>
      </header>
      {isSmallDevice ? (
        <VendorAllOrdersCards data={data} />
      ) : (
        <div
          className="ag-theme-alpine ag-grid-example  vendors-all-orders-table copy-paste-table"
          style={{ minHeight: 595, width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            getRowHeight={getRowHeight}
            onGridReady={onGridReady}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            components={components}
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

          {gridReady === true && (
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(data?.length / pageSize)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default VendorAllOrdersTable;
