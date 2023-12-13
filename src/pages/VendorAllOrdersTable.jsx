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
import allOrdersParentDefs from "../column-definitions/AllOrdersParentDefs";
import TableSettings from "../components/TableSettings";

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
  } else if (vendor === "Pepsi") {
    vendorID = "D00003";
  }

  const url = `https://api.marlin.ge/api/RetailOrdersByAccountAndVendorFront/${user.decodedToken.AccountID}/${vendorID}`;

  const { isLoading, error, data } = useQuery({
    queryKey: "r-repoData",
    queryFn: () => fetchData(url),
    onSuccess: (data) =>{
      
    },
    select: (data) => {
      return data.data.data
    },
  });



  const [columnDefs] = useState(allOrdersParentDefs)


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

  console.log({showFilters})

  // useVendorOrdersNavigate(gridApi, gridRef, setOpenedRowId);
  // useOrdersNavigate(gridApi, gridRef, setOpenedRowId);
  useOrdersNavigate(gridApi, gridRef, setOpenedRowId);


  useEffect(() => {
    if (!gridRef.current) return;
    if (!gridApi) return;
    gridRef.current.api.resetRowHeights();
  }, [openedRowId, gridRef, gridApi]);

  // function getRowHeight(params) {
  //   const { id } = params.node;
  //   if (id == openedRowId) {
  //     return 140;
  //   }
  //   return 32;
  // }

  function getRowHeight(params) {
    const { id } = params.node;
    if (id == openedRowId) {
      return 140;
    }

    if (rowHeightIndex === 0) {
      return 25;
    } else if (rowHeightIndex === 1) {
      return 32;
    } else if (rowHeightIndex === 2) {
      return 37;
    }
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
          <TableSettings
              isSmallDevice={isSmallDevice}
              setIsSearchOpen={setIsSearchOpen}
              defHeaderList={headerList}
              rowData={data}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="all-orders"
              // paginationGoToPage={2}
              // paginationGoTo={2}
            />

            {/* END */}
            {/* END */}
            {/* END */}
          </div>
        </div>
      </header>
      {isSmallDevice ? (
        <VendorAllOrdersCards data={data} />
      ) : (
        <div
        id="marlin-table"

          className="ag-theme-alpine ag-grid-example  all-orders-parent  vendors-all-orders-table copy-paste-table"
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

{/* <AgGridReact
            ref={gridRef}
            getRowHeight={getRowHeight}
            onGridReady={onGridReady}
            rowData={rowData?.data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            components={components}
            paginationPageSize={pageSize}
          ></AgGridReact> */}

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
