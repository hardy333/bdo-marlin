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
import "../styles/invoice-details-table.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import d from "../assets/invoice-details.json";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AgTablePag from "../components/AgTablePag";

import { invoicesTableHeaderList } from "../column-definitions/InvoicesTableDefs";
import {
  InvoiceDetailsTableDefs,
  invoiceDetailsTableHeaderList,
} from "../column-definitions/InvoiceDetailsTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import Tippy from "@tippyjs/react";

const InvoiceDetailsTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState(invoicesTableHeaderList);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d);

  const [columnDefs] = useState(InvoiceDetailsTableDefs);

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

  const gridRef = useRef(null);

  // URL info
  const [searchParams] = useSearchParams();
  let date = searchParams.get("date") || "01/30/2023";
  let shop = searchParams.get("shop") || "SPAR001";
  let shopAddress = searchParams.get("shopAddress") || "Rustaveli 01.";
  let vendor = searchParams.get("vendor") || "GDM";
  let status = searchParams.get("status") || "Pending";

  let statusBg;
  if (status === "In Progress") {
    statusBg = "#6E0FF5";
  } else if (status === "Delivered") {
    statusBg = "#01C6B5";
  } else {
    statusBg = "#FFC23C";
  }

  const [gridReady, setGridReady] = useState(false);

  useEffect(() => {
    const x = document.querySelector(".ag-center-cols-container");

    if (!x) return;

    const handleGridClick = (e) => {
      const t = e.target;

      navigate(`/order-details`);
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  }, [gridApi, gridRef]);

  const navigate = useNavigate();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");

  return (
    <>
      <header className="all-orders__header invoice-details-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left invoice-details-left gap-5"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 style={{ marginRight: 10, marginBottom: "auto" }}>
              ინვოისის დეტალები
            </h4>
            <section className="info-badge-container">
              {/* 1 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`მომწოდებელი: 
                  GDM`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text"> GDM.</span>
                </p>
              </Tippy>
              {/* 2  invoisis #  */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ინვოისის #: 92829000`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text">92829000</span>
                </p>
              </Tippy>
              {/* 3 zednadebis #*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ზედნადების #: 9282034`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text info-badge-text__date">
                    #: 9282034
                  </span>
                </p>
              </Tippy>
              {/* 4 shekvetis #*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`შეკვეთის #: 9282034`}
              >
                <p
                  className="info-badge info-badge-mobile info-badge-link"
                  onClick={() => navigate("/order-details")}
                >
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text"> 9282034</span>
                </p>
              </Tippy>
              {/* 5  tarigi*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`შეკვეთის თარიღი: 
                  25/05/2023`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text">01/30/2023 </span>
                </p>
              </Tippy>
              {/* 6 gadaxdis vada*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`გადახდის ვადა: 
                01/30/2023`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text">01/30/2023</span>
                </p>
              </Tippy>
            </section>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options mb-auto">
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={invoiceDetailsTableHeaderList}
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
      <div
        className="ag-theme-alpine ag-grid-example invoice-details-table"
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

        {gridReady === true && <AgTablePag gridRef={gridRef} pageCount={67} />}

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

export default InvoiceDetailsTable;
