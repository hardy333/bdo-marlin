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

const InvoicesTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const gridRef = useRef(null);

  const [columnDefs] = useState(InvoicesTableDefs);

  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);

  const url = "https://10.0.0.202:5001/api/INVFront/M00001";
  const { isLoading, error, data } = useQuery("invoices", () => fetchData(url));

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
    setGridReady(true)
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
  useCopyTable(gridReady)

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

            
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 60.1 60" enable-background="new 0 0 60.1 60" xml:space="preserve">
<g id="Layer_1">
	<g>
		<path fill="none" d="M46.2,41.2l-1.6,2.6c-0.1,0.2-0.3,0.4-0.4,0.7c0.2,0,0.4,0.1,0.6,0.1c3,0,5.4-2.4,5.4-5.4
			c0-2.6-1.9-4.8-4.3-5.3c0.5,0.7,0.8,1.4,1.1,2.2C47.4,37.8,47.1,39.6,46.2,41.2L46.2,41.2z"/>
		<path fill="none" d="M23.9,21.5c-4.7,0-8.5,3.8-8.5,8.5s3.8,8.5,8.5,8.5c2.5,0,4.8-1.2,6.4-3c-0.4-1.1-0.3-2.4,0.3-3.5l1-1.7
			c0.2-0.3,0.4-0.6,0.7-0.9C32,25,28.4,21.5,23.9,21.5L23.9,21.5z"/>
		<path opacity="0.77" fill="#6E0FF5" enable-background="new    " d="M31.6,30.3l-1,1.7c-0.6,1.1-0.7,2.4-0.3,3.5
			c1.3-1.5,2.1-3.4,2.1-5.5c0-0.2,0-0.4-0.1-0.6C32,29.7,31.8,30,31.6,30.3L31.6,30.3z"/>
		<path opacity="0.77" fill="#6E0FF5" enable-background="new    " d="M59.4,43c-0.3-1.1-1-2-2-2.6c-0.7-0.4-0.9-1.2-0.5-2
			c0.1-0.2,0.3-0.4,0.5-0.5c2-1.2,2.7-3.8,1.6-5.8l-0.9-1.6c-0.8-1.3-2.2-2.2-3.7-2.2c-0.8,0-1.5,0.2-2.2,0.6
			C52,28.9,51.7,29,51.5,29c-0.5,0-1-0.3-1.2-0.7c-0.1-0.2-0.2-0.4-0.2-0.6c0-1.1-0.4-2.2-1.2-3.1c-0.5-0.6-1.2-1-1.9-1.2
			c-0.4,1.8-1.5,3.5-3.2,4.6c-0.3,0.2-0.6,0.5-0.8,0.8c-0.6,1.2-0.2,2.5,0.8,3.1c0.8,0.5,1.5,1.1,2.1,1.9c2.5,0.5,4.3,2.7,4.3,5.3
			c0,3-2.4,5.4-5.4,5.4c-0.2,0-0.4,0-0.6-0.1c-1.3,1.7-3.3,2.7-5.4,2.7c-1.2,0-2.3-0.3-3.4-0.9c-0.3-0.2-0.7-0.3-1.1-0.3
			c-1.2,0-2.2,1-2.2,2.3c0,0.1,0,0.2,0,0.4c0.8,0.9,2,1.5,3.2,1.5c0.7,0,1.3-0.2,2-0.5l0.2-0.1c0.2-0.1,0.5-0.2,0.7-0.2
			c0.1,0,0.2,0,0.4,0c0.4,0.1,0.7,0.3,0.9,0.7c0.1,0.2,0.2,0.4,0.2,0.7c0,2.4,1.9,4.3,4.3,4.3h1.9c2.4,0,4.3-1.9,4.3-4.3
			c0-0.8,0.6-1.4,1.4-1.4c0.2,0,0.5,0.1,0.7,0.2c0.7,0.4,1.4,0.6,2.1,0.6c1.5,0,3-0.8,3.7-2.1l1-1.7C59.6,45.2,59.7,44.1,59.4,43
			L59.4,43z"/>
		<path opacity="0.8" fill="#FFFFFF" enable-background="new    " d="M39.4,39.1c0,2.8,2.1,5,4.8,5.3c0.2-0.2,0.3-0.4,0.4-0.7
			l1.6-2.6c0.9-1.6,1.2-3.4,0.7-5.1c-0.2-0.8-0.6-1.5-1.1-2.2c-0.3-0.1-0.7-0.1-1-0.1C41.8,33.7,39.4,36.1,39.4,39.1L39.4,39.1z"/>
		<path opacity="0.8" fill="#FFFFFF" enable-background="new    " d="M30.6,46.2c-0.6-1-0.7-2.2-0.4-3.3c0.3-1.1,1-2,2-2.6
			c0.2-0.1,0.4-0.3,0.5-0.5c0.2-0.3,0.2-0.7,0.1-1.1c-0.1-0.4-0.3-0.7-0.7-0.9c-0.9-0.5-1.6-1.4-1.9-2.3c-1.6,1.8-3.8,3-6.4,3
			c-4.7,0-8.5-3.8-8.5-8.5s3.8-8.5,8.5-8.5s8.1,3.5,8.4,7.9c0.8-0.8,1.9-1.2,3-1.2c0.8,0,1.5,0.2,2.1,0.6c0.2,0.1,0.4,0.2,0.7,0.2
			c0.8,0,1.4-0.6,1.4-1.4c0-2.4,1.9-4.3,4.3-4.3h2c0.4,0,0.7,0.1,1.1,0.2c0.3-1.5,0.1-3.2-0.7-4.7l-1.5-2.6
			c-1.2-2.1-3.5-3.4-5.9-3.4c-1.2,0-2.3,0.3-3.4,0.9c-0.3,0.2-0.7,0.3-1.1,0.3c-0.8,0-1.5-0.4-2-1.1c-0.2-0.3-0.3-0.6-0.3-1
			c0-1.8-0.6-3.5-1.9-4.8C29,5.8,27.4,5.1,25.6,5h-3.2c-3.7,0-6.8,3-6.8,6.7c0,1.2-1,2.2-2.2,2.2c-0.4,0-0.7-0.1-1.1-0.3
			c-1-0.6-2.2-0.9-3.4-0.9c-2.4,0-4.7,1.3-5.8,3.4l-1.6,2.6C-0.4,22,0.7,26.1,4,28c0.5,0.3,0.9,0.8,1.1,1.4c0.2,0.6,0.1,1.2-0.2,1.7
			c-0.2,0.3-0.5,0.6-0.8,0.8c-1.6,0.9-2.7,2.3-3.2,4.1c-0.5,1.7-0.2,3.6,0.7,5.1l1.5,2.5c1.2,2.2,3.5,3.5,5.9,3.5
			c1.1,0,2.1-0.2,3.1-0.7l0.2-0.1c0.3-0.2,0.7-0.3,1.1-0.3c0.2,0,0.4,0,0.6,0.1c0.6,0.2,1.1,0.5,1.4,1.1c0.2,0.3,0.3,0.7,0.3,1
			c0,3.7,3,6.8,6.8,6.8h3c3.6,0,6.5-2.8,6.7-6.4c-0.2-0.2-0.4-0.5-0.6-0.8L30.6,46.2L30.6,46.2z"/>
		<path opacity="0.8" fill="#FFFFFF" enable-background="new    " d="M34.3,46c0.4,0,0.8,0.1,1.1,0.3c1,0.6,2.2,0.9,3.4,0.9
			c2.2,0,4.2-1,5.4-2.7c-2.7-0.3-4.8-2.6-4.8-5.3c0-3,2.4-5.4,5.4-5.4c0.4,0,0.7,0,1,0.1c-0.5-0.8-1.2-1.4-2.1-1.9
			c-1-0.6-1.4-1.9-0.8-3.1c0.2-0.3,0.5-0.6,0.8-0.8c1.7-1,2.8-2.7,3.2-4.6c-0.3-0.1-0.7-0.2-1.1-0.2h-2c-2.4,0-4.3,1.9-4.3,4.3
			c0,0.8-0.7,1.4-1.4,1.4c-0.2,0-0.5-0.1-0.7-0.2c-0.7-0.4-1.4-0.6-2.1-0.6c-1.1,0-2.2,0.5-3,1.2c0,0.2,0.1,0.4,0.1,0.6
			c0,2.1-0.8,4-2.1,5.5c0.3,1,1,1.8,1.9,2.3c0.3,0.2,0.6,0.5,0.7,0.9c0.1,0.4,0,0.8-0.1,1.1c-0.1,0.2-0.3,0.4-0.5,0.5
			c-1,0.6-1.7,1.5-2,2.6c-0.3,1.1-0.1,2.3,0.4,3.3l0.9,1.6c0.2,0.3,0.4,0.5,0.6,0.8c0-0.1,0-0.2,0-0.4C32.1,47,33.1,46,34.3,46z"/>
		<path opacity="0.58" fill="#6E0FF5" enable-background="new    " d="M34.3,46c0.4,0,0.8,0.1,1.1,0.3c1,0.6,2.2,0.9,3.4,0.9
			c2.2,0,4.2-1,5.4-2.7c-2.7-0.3-4.8-2.6-4.8-5.3c0-3,2.4-5.4,5.4-5.4c0.4,0,0.7,0,1,0.1c-0.5-0.8-1.2-1.4-2.1-1.9
			c-1-0.6-1.4-1.9-0.8-3.1c0.2-0.3,0.5-0.6,0.8-0.8c1.7-1,2.8-2.7,3.2-4.6c-0.3-0.1-0.7-0.2-1.1-0.2h-2c-2.4,0-4.3,1.9-4.3,4.3
			c0,0.8-0.7,1.4-1.4,1.4c-0.2,0-0.5-0.1-0.7-0.2c-0.7-0.4-1.4-0.6-2.1-0.6c-1.1,0-2.2,0.5-3,1.2c0,0.2,0.1,0.4,0.1,0.6
			c0,2.1-0.8,4-2.1,5.5c0.3,1,1,1.8,1.9,2.3c0.3,0.2,0.6,0.5,0.7,0.9c0.1,0.4,0,0.8-0.1,1.1c-0.1,0.2-0.3,0.4-0.5,0.5
			c-1,0.6-1.7,1.5-2,2.6c-0.3,1.1-0.1,2.3,0.4,3.3l0.9,1.6c0.2,0.3,0.4,0.5,0.6,0.8c0-0.1,0-0.2,0-0.4C32.1,47,33.1,46,34.3,46z"/>
	</g>
</g>
<g id="Isolation_Mode">
</g>
<g id="Layer_3">
</g>
</svg>
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
