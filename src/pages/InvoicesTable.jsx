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

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import useRemoveId from "../components/useRemoveId";
import {
  InvoicesTableDefs,
  invoicesTableHeaderList,
} from "../column-definitions/InvoicesTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import useOrdersNavigate from "../hooks/useOrdersNavigate";
import useInvoiceNavigate from "../hooks/useInvoiceNavigate";
import InvoiceTableCards from "../components/InvoiceTableCards";
import useCopyTable from "../hooks/useCopyTable";
import AgTablePag from "../components/AgTablePag";
import { useAuthContext } from "../hooks/useAuthContext";

const InvoicesTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const gridRef = useRef(null);

  const [columnDefs] = useState(InvoicesTableDefs);

  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);
  const { user } = useAuthContext();

  const url =
    "https://api.marlin.ge/api/INVFront/" + user.decodedToken.AccountID;
  const { isLoading, error, data } = useQuery({
    queryKey: "r-invoices",
    queryFn: () => fetchData(url),
    select:(data) => {
      return data.data
    }
  });

  const [rowData, setRowData] = useState(() => {
    if (data || data?.data) {
      return data.data;
    }
    return null;
  });

  console.log({ rowData });

  useEffect(() => {
    if (!data) return;
    if (isLoading) return;
    if (error) return;
    setRowData(data.data);
  }, [data, isLoading, error]);

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
    setGridReady(true);
  };

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  useRemoveId(gridApi, gridRef);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");
  const [gridReady, setGridReady] = useState(false);

  useInvoiceNavigate();
  useCopyTable(gridReady);

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
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={invoicesTableHeaderList}
              rowData={rowData}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="all-orders"
            />
          </div>
        </div>
      </header>
      {isSmallDevice ? (
        <InvoiceTableCards data={rowData} />
      ) : (
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example invoices-table copy-paste-table"
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

          {gridReady === true && (
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(rowData?.length / pageSize)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default InvoicesTable;
