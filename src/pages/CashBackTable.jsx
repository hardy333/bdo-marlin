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
import "../styles/cash-back-table.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import "../styles/discounts-table-2.css";
import Select from "react-select";

import "../styles/discounts-table.css";
import useRemoveId from "../components/useRemoveId";

import {
  getCashBackTableDefs,
  cashBackTableHeaderList,
} from "../column-definitions/CashBackTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import Tippy from "@tippyjs/react";
import { useSearchParams } from "react-router-dom";
import BonusTableCards from "../components/BonusTableCards";
import useCopyTable from "../hooks/useCopyTable";
import AgTablePag from "../components/AgTablePag";
import {
  DocumentNumberSvg,
  GegmaAmountSvg,
  ScheduleDateSvg,
  ShetanxmebisPirobaSvg,
  VendorSvg,
} from "../components/svgs/InfoBadgeSvgs";
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressBar from "../components/ProgressBar";
import { useStopwatch } from "react-timer-hook";
import useTimerToast from "../hooks/useTimerToast";

import toast, { Toaster } from "react-hot-toast";


const CashBackTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [searchParams] = useSearchParams();
  const retroBonusID =
    searchParams.get("retroBonusID") || "19ac6fd7-7f9e-11e8-80ef-005056b569bf";

  const documentNo = searchParams.get("documentNo");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const vendor = searchParams.get("vendor");

  const condition = searchParams.get("condition");
  const planAmount = searchParams.get("planAmount");
  const retroPercent = searchParams.get("retroPercent");

  const { user } = useAuthContext();

  const shopsUrl = `https://api.marlin.ge/api/Shops?AccountID=${user.decodedToken.AccountID}`;

  const oldShopsUrl = `https://10.0.0.202:5001/api/Shops?page=1&pageSize=262`

  // Shops Fetch



  
  let isGlobalRetroPersent = false

  if(typeof Number(retroPercent) === "number" && !Number.isNaN(Number(retroPercent))){
    isGlobalRetroPersent = true
  }
  console.log({retroPercent, isGlobalRetroPersent})

  
  // Shops Fetch
  const {
    isLoading: shopsIsLoading,
    error: shopsError,
    data: shopsData,
  } = useQuery({
    queryKey: "retro-bonus-table-shops",
    queryFn: () => fetchData(shopsUrl),
    onSuccess: (data) => {

      handleShopChange({
        value: data[0].name,
        label: data[0].name,
        shopID: data[0].shopID,
      });
    },
    select: (data) => {
      return data.data
    }
    // refetchOnWindowFocus: false
  });
  

  const [selectedShop, setSelectedShop] = useState(() => {
    if (!shopsData) return null;
    return {
      value: shopsData[0].name,
      label: shopsData[0].name,
      shopID: shopsData[0].shopID,
    };
  });

  const url = `https://api.marlin.ge/api/RetroBonusDetsilsFront/${selectedShop?.shopID}/${retroBonusID}`;
  const oldUrl = `https://10.0.0.202:5001/api/RetroBonusDetsilsFront/${selectedShop?.shopID}/${retroBonusID}`

  // Table Fetch
  // Table Fetch
  const {
    isLoading: tableDataIsLoading,
    error: tableDataError,
    data: tableData,
    isFetching: tableDataIsFetching,
  } = useQuery({
    queryKey: ["retro-bonus-details", retroBonusID, selectedShop?.shopID],
    queryFn: () => fetchData(url),
    enabled: Boolean(selectedShop?.shopID),
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data
    }
  });



  const handleShopChange = (shopObj) => {
  
    setSelectedShop(shopObj);
  };

  const [columnDefs] = useState(
    getCashBackTableDefs(!isGlobalRetroPersent)
  );

  console.log("xxx", tableData?.data && tableData?.data[1]?.retroPercent)


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
  const gridRef = useRef(null);
  useRemoveId(gridApi, gridRef);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");
  const [gridReady, setGridReady] = useState(false);
  useCopyTable(gridReady);


  useTimerToast( tableDataIsLoading, toast)



  return (
    <>
      <header
        className="all-orders__header cash-back-header"
        style={{ position: "relative" }}
      >
        <ProgressBar show={tableDataIsLoading || shopsIsLoading} />

        <Toaster /> 
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left cash-back-table-header-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4
              onClick={() => {
                toast.success("This worked", {
                  id: toastId,
                });
              }}
              style={{ marginRight: 20 }}
              id="discunts"
            >
              რეტრო ბონუსები
            </h4>
            <section className="info-badge-container">
              {/* 1 მომწოდებელი */}
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
              {/* 2 პირობა */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`პირობა: ${condition}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <FaHandshake /> */}
                  {/* <img src="cash-back/shetanxmebis-piroba.svg" alt="" /> */}
                  <ShetanxmebisPirobaSvg />
                  <span className="info-badge-text"> {condition}</span>
                </p>
              </Tippy>
              {/* 3 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`პერიოდი: ${startDate?.split("T")[0]} - ${
                  endDate || "განუსაზღვრელია"
                } `}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="order-details/calendar.svg" alt="" /> */}
                  <ScheduleDateSvg />
                  <span className="info-badge-text info-badge-text__date">
                    {startDate?.split("T")[0]} - {endDate || "განუსაზღვრელია"}
                  </span>
                </p>
              </Tippy>
              {/* 4 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`დოკუმენტის #:  ${documentNo}`}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="order-details/vendor.svg" alt="" /> */}
                  {/* <img src="cash-back/document-number.svg" alt="" /> */}
                  <DocumentNumberSvg />

                  <span className="info-badge-text">#: {documentNo}</span>
                </p>
              </Tippy>
              {/* 5 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`გეგმა: ${
                  planAmount === "undefined"
                    ? "განუსაზღვრელი"
                    : planAmount + " GEL"
                } `}
              >
                <p className="info-badge info-badge-mobile">
                  {/* <img src="cash-back/gegma.svg" alt="" /> */}
                  <GegmaAmountSvg />
                  <span className="info-badge-text">
                    {planAmount === "undefined"
                      ? "განუსაზღვრელი"
                      : planAmount + " GEL"}{" "}
                  </span>
                </p>
              </Tippy>
              {/* 6 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`ქეშბექი: ${retroPercent}%`}
              >
                <p className="info-badge info-badge-mobile"
                style={{display: isGlobalRetroPersent ? "inline-flex": "none"}}
                
                >
                  <img
                    src="cash-back/cashback.svg"
                    alt=""
                    style={{ height: "22px" }}
                  />

                  <span className="info-badge-text"> {retroPercent} %</span>
                </p>
              </Tippy>
            </section>
            <Menu
              className="pending-status-menu"
              menuButton={
                <button className="btn btn-status-2 mt-[-2px] discount-conditions">
                  ფასდაკლების პირობები
                </button>
              }
              direction="bottom"
              align="center"
              transition
            >
              <MenuItem>10-დან 1000-მდე, 5%</MenuItem>
              <MenuItem>1001-დან 5000-მდე, 6%</MenuItem>
              <MenuItem>5001-დან 10000-მდე, 7%</MenuItem>
            </Menu>
          </div>

          {/* Right */}
          <div className="all-orders__settings__options self-start cash-back-table">
            <TableSettings
              isLargeHeader={true}
              isSmallDevice={isSmallDevice}
              defHeaderList={cashBackTableHeaderList}
              rowData={tableData?.data}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="retro-bonuses"
            />
          </div>
        </div>
      </header>
      {isSmallDevice ? (
        <BonusTableCards data={tableData?.data} />
      ) : (
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example  discounts-table discounts-table-with-groups cash-back-table copy-paste-table"
          style={{ minHeight: 595, width: "100%" }}
        >
          <Select
            className="react-select-container sla-select doscounts-table-select"
            classNamePrefix="react-select"
            options={shopsData?.slice(0, 10)?.map((shopObj) => ({
              value: shopObj.name,
              label: shopObj.name,
              shopID: shopObj.shopID,
            }))}
            onChange={handleShopChange}
            value={selectedShop}
            defaultValue={selectedShop}
          />
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            rowData={tableData?.data}
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
              pageCount={Math.ceil(tableData?.data?.length / pageSize)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CashBackTable;
