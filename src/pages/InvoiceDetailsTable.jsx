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
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import InvoiceDetailsCards from "../components/InvoiceDetailsCards";
import useCopyTable from "../hooks/useCopyTable";
import { InvoiceNumberSvg, OrderDateSvg, OrderNumberSvg, VendorSvg, WaybillNumberSvg } from "../components/svgs/InfoBadgeSvgs";

const InvoiceDetailsTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [columnDefs] = useState(InvoiceDetailsTableDefs);

  const [searchParams] = useSearchParams();
  const invoiceID =
    searchParams.get("invoiceID") || "de4d21f9-3531-11ee-8123-005056b5a0aa";

  const waybillNumber = searchParams.get("waybillNumber");
  const orderNumber = searchParams.get("orderNumber");

  const invoiceNumber = searchParams.get("invoiceNumber");
  const invoiceAmount = searchParams.get("invoiceAmount");
  const orderID = searchParams.get("orderID");
  const amount = searchParams.get("amount");
  const vendor = searchParams.get("vendor");
  const shop = searchParams.get("shop");
  const date = searchParams.get("date");

  const url = "https://api.marlin.ge/api/InvoiceDetailsFront/" + invoiceID;

  const { isLoading, error, data } = useQuery({
    queryKey: ["r-invoice-details", invoiceID],
    queryFn: () => fetchData(url),
    select: (data) => {
      return data.data
    }
  });

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

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const gridRef = useRef(null);

  const [gridReady, setGridReady] = useState(false);

  const navigate = useNavigate();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");

  useCopyTable(gridReady);

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
                content={`მომწოდებელი: ${vendor}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="order-details/vendor.svg" alt="" /> */}
                  <VendorSvg />
                  <span className="info-badge-text"> {vendor}</span>
                </p>
              </Tippy>
              {/* 2  invoisis #  */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ინვოისის #: ${invoiceNumber}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="/invoices-badge-icons/invoice.svg" alt="" /> */}
                  <InvoiceNumberSvg />
                  <span className="info-badge-text">#: {invoiceNumber}</span>
                </p>
              </Tippy>
              {/* 3 zednadebis #*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ზედნადების #: ${waybillNumber || "Unknown"}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="invoices-badge-icons/waybill.svg" alt="" /> */}
                  <WaybillNumberSvg />
                  <span className="info-badge-text info-badge-text__date">
                    #: {waybillNumber || "Unknown"}
                  </span>
                </p>
              </Tippy>
              {/* 4 shekvetis #*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`შეკვეთის #: ${orderNumber}`}
              >
                <p
                  className="info-badge info-badge-mobile info-badge-link"
                  onClick={() => {
                    const urlParams = new URLSearchParams();
                    urlParams.append("waybillNumber", waybillNumber);
                    urlParams.append("orderNumber", orderNumber);
                    urlParams.append("orderID", orderID);
                    urlParams.append("date", date);
                    urlParams.append("vendor", vendor);
                    urlParams.append("shop", shop);
                    urlParams.append("invoiceNumber", invoiceNumber);
                    urlParams.append("invoiceID", invoiceID);
                    urlParams.append("invoiceAmount", invoiceAmount);
                    urlParams.append("amount", amount);
                    urlParams.append("status", "რეალიზებულია");

                    navigate("/order-details?" + urlParams.toString());
                  }}
                >
                  {/* <img src="invoices-badge-icons/order.svg" alt="" /> */}
                  <OrderNumberSvg />
                  <span className="info-badge-text">#: {orderNumber}</span>
                </p>
              </Tippy>
              {/* 5  tarigi*/}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`შეკვეთის თარიღი: ${date?.split("T")[0]}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="order-details/calendar.svg" alt="" /> */}
                  <OrderDateSvg />
                  <span className="info-badge-text">
                    {date?.split("T")[0]}{" "}
                  </span>
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
                <p
                  style={{ display: "none" }}
                  className="info-badge info-badge-mobile"
                >
                  <img src="invoices-badge-icons/gadaxdis-vada-2.svg" alt="" />
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

      {isSmallDevice ? (
        <InvoiceDetailsCards data={rowData} />
      ) : (
        <div
          className="ag-theme-alpine ag-grid-example invoice-details-table copy-paste-table"
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
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(rowData?.length / pageSize)}
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
      )}
    </>
  );
};

export default InvoiceDetailsTable;
