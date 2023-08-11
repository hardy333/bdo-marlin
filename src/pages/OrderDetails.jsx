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

    console.log(searchParams.get("orderID"))
    
    
  const url = `https://10.0.0.202:5001/api/OrderDetailsFront/${orderID}`;

  const { isLoading, error, data } = useQuery("order-details-data", () =>
    fetchData(url)
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

  const rowHeightBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      rowHeightBtnRef.current?.click();
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const gridRef = useRef(null);

  // URL info
  let date = searchParams.get("date") || "01/30/2023";
  let shopAddress = searchParams.get("shop") || "რუსთაველი 01.";
  let vendor = searchParams.get("vendor") || "GDM";
  let status = searchParams.get("status") || "გაგზავნილია";

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
          {/* Left */}
          <div
            className="order-details-left gap-10"
            style={{ paddingLeft: "0", marginLeft: 2 }}
          >
            <h4
              style={{ marginRight: 0, marginBottom: "auto" }}
              className="text-center w-full sm:text-start sm:w-[220px] mb-4 "
            >
              შეკვეთის დეტალები
            </h4>
            {/* Bottom + Top */}
            <div className="">
              {/* Top */}
              <div className="flex mb-3 max-[450px]:grid text-center grid-cols-2 items-start gap-14 justify-center max-sm:w-full ">
                {/* 1 */}
                <div className="">
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`მომწოდებელი: ${vendor}`}
                  >
                    <p className="flex  p mb-2">
                      <span className="icon-span hidden sm:flex items-center font-bold text-[14px] pe-3 bg w-[25px] h-[25px]">
                        <img src="order-details/vendor.svg" alt="" />
                      </span>
                      <span
                        style={{ maxWidth: "120px" }}
                        className="badge  text-start justify-start font-sans align-middle text-[14px] max-sm:bg-primary/10 max-sm:text-primary  max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium"
                      >
                        {vendor}.
                      </span>
                    </p>
                  </Tippy>
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={`თანხა: 1578 GEL`}
                  >
                    <p className="p">
                      <span className="hidden icon-span sm:inline font-bold text-[14px] pe-3 bg">
                        <img src="order-details/money.svg" alt="" />
                      </span>
                      <span
                        style={{ maxWidth: "120px" }}
                        className="badge text-[14px] max-sm:bg-primary/10 max-sm:text-primary justify-center max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium"
                      >
                        1578 GEL.
                      </span>
                    </p>
                  </Tippy>
                </div>

                {/* 2 */}
                <div>
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={"მაღაზია: " + shopAddress}
                  >
                    <p className="flex align-middle p mb-2">
                      <span className="icon-span flex w-[25px] h-[25px]  font-bold text-[14px] pe-3 bg">
                        <img src="order-details/shop.svg" alt="" />
                      </span>
                      <span
                        style={{
                          maxWidth: "120px",
                          width: shopAddress.length * 10 + "px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          display: "block",
                        }}
                        className="badge text-start text-[14px] max-sm:bg-primary/10 max-sm:text-primary  max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium"
                      >
                        {shopAddress + "."}
                      </span>
                    </p>
                  </Tippy>
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content="ინვოისის თანხა: 2039 GEL"
                  >
                    <p className="p">
                      <span className="block icon-span font-bold text-[14px] pe-3 bg">
                        <img src="order-details/document.svg" alt="" />
                      </span>
                      <span className="badge text-[14px] max-sm:bg-primary/10 max-sm:text-primary justify-center max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium">
                        2039 GEL.
                      </span>
                    </p>
                  </Tippy>
                </div>

                <Tippy
                  className="tooltip-1"
                  arrow={false}
                  placement="top"
                  content={`შეკვეთის თარიღი: 
                  25/05/2023`}
                >
                  <p className="p">
                    <span className="icon-span flex w-[25px] h-[25px]  font-bold text-[14px] pe-3 bg">
                      <img src="order-details/clock.svg" alt="" />
                    </span>
                    <span className="badge text-[14px] max-sm:bg-primary/10 max-sm:text-primary justify-center max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium">
                      {date.split(" ")[0]}.
                    </span>
                  </p>
                </Tippy>
                <Tippy
                  className="tooltip-1"
                  arrow={false}
                  placement="top"
                  content="გეგმიური მოწოდების თარიღი: 02/08/2023"
                >
                  <p className="p">
                    <span className="icon-span hidden sm:inline font-bold text-[14px] pe-3 bg">
                      <img src="order-details/calendar.svg" alt="" />
                    </span>
                    <span className="badge text-[14px] max-sm:bg-primary/10 max-sm:text-primary justify-center max-sm:rounded-lg max-sm:p-1 max-sm:flex max-sm:items-center max-sm:pt-2 max-sm:ps-3 max-sm:pe-2 max-sm:text-[12px] max-sm:font-medium">
                      02/08/2023.
                    </span>
                  </p>
                </Tippy>

                <Menu
                  className="pending-status-menu"
                  menuButton={
                    <button
                      style={{ backgroundColor: statusBg, color: "#fff" }}
                      className="btn btn-status-2 mt-[-2px]"
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
              {/* Bottom */}
              <div className="flex gap-14"></div>
            </div>
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
