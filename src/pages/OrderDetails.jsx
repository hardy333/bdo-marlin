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

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import { useSearchParams } from "react-router-dom";
import AgTablePag from "../components/AgTablePag";
import useRemoveId from "../components/useRemoveId";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import { useMediaQuery } from "@uidotdev/usehooks";
import OrderDetailsCards from "../components/OrderDetailsCards";
import Tippy from "@tippyjs/react";

import TableSettings from "../components/TableSettings";
import {
  OrderDetailsDefs,
  orderDetailsHeaderList,
} from "../column-definitions/OrderDetailsDefs";
const OrderDetails = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchParams] = useSearchParams();
  const orderID =
    searchParams.get("orderID") || "f0ce0829-044b-11ee-8123-005056b5a0aa";

  const url = `https://10.0.0.202:5001/api/OrderDetailsFront/${orderID}`;

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["order-details-data", orderID],
      queryFn: () => fetchData(url)
    }
  );

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

  const [columnDefs] = useState(OrderDetailsDefs);


  
  

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
      filterParams: { newNumberFilter: true },
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

  // URL info
  let date = searchParams.get("date") || "01/30/2023";
  let scheduledDate = searchParams.get("scheduledDate") || "01/30/2023";
  let shopAddress = searchParams.get("shop") || "რუსთაველი 01.";
  let vendor = searchParams.get("vendor") || "GDM";
  let status = searchParams.get("status") || "გაგზავნილია";
  let amount = searchParams.get("amount") || "308.4 GEL";
  let invoiceAmount = searchParams.get("invoiceAmount") || "";

  let statusBg;

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

  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");

  return (
    <>
      <header className="all-orders__header order-details-header">
        <div className="all-orders__settings  height-[20px]">
          <div
            className="order-details-left gap-10"
            style={{ paddingLeft: "0", marginLeft: 2 }}
          >
            <h4
              style={{ marginRight: 0, marginBottom: "auto" }}
              className="  sm:text-start mb-4 "
            >
              შეკვეთის დეტალები
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
                  <img src="order-details/vendor.svg" alt="" />
                  <span className="info-badge-text"> {vendor}</span>
                </p>
              </Tippy>
              {/* 2 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={"მაღაზია: " + shopAddress}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/shop.svg" alt="" />
                  <span className="info-badge-text"> {shopAddress}</span>
                </p>
              </Tippy>
              {/* 3 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`შეკვეთის თარიღი: ${date}`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/clock.svg" alt="" />
                  <span className="info-badge-text"> {date}</span>
                </p>
              </Tippy>
              {/* 4 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`გეგმიური მოწოდების თარიღი: ${scheduledDate}`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/calendar.svg" alt="" />
                  <span className="info-badge-text info-badge-text__date">
                    {scheduledDate}
                  </span>
                </p>
              </Tippy>

              {/* 5 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`თანხა: ${amount}`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/money.svg" alt="" />
                  <span className="info-badge-text">{amount}</span>
                </p>
              </Tippy>
              {/* 6 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ინვოისის თანხა: ${invoiceAmount}`}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/document.svg" alt="" />
                  <span className="info-badge-text">{invoiceAmount}</span>
                </p>
              </Tippy>
            </section>
            <Menu
              className="pending-status-menu"
              menuButton={
                <button
                  style={{ backgroundColor: statusBg, color: "#fff" }}
                  className="btn btn-status-2 mt-[-2px] mb-auto"
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
            <div className="all-orders__settings__options  self-start">
              <TableSettings
                isSmallDevice={isSmallDevice}
                defHeaderList={orderDetailsHeaderList}
                rowData={rowData}
                gridApi={gridApi}
                gridRef={gridRef}
                gridColumnApi={gridColumnApi}
                rowHeightIndex={rowHeightIndex}
                setRowHeightIndex={setRowHeightIndex}
                pageName="all-orders"
              />
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