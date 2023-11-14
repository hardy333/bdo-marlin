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
import { DocumentNumberSvg, GegmaAmountSvg, OrderDateSvg, ScheduleDateSvg, ShetanxmebisPirobaSvg, VendorSvg } from "../components/svgs/InfoBadgeSvgs";

const shopsUrl = "https://api.marlin.ge/api/Shops?page=1&pageSize=520"


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

  const { isLoading: shopsIsLoading, error: shopsError, data: shopsData } = useQuery("retro-bonus-table-shops", () => fetchData(shopsUrl));
  const [selectedShop,setSelectedShop ] = useState(null)

  const handleShopChange = (x) => {
    setSelectedShop(x)



  }


  

  useEffect(() => {
    if(!shopsData) return
    if(selectedShop) return 
    const shop = shopsData?.data.filter(obj => obj.shopID === "866c4bf5-5bd7-4183-a3c3-ab3b1ecd5b6a")[0]
    setSelectedShop({value: shop.name, label: shop.name, shopID: shop.shopID })

  },[shopsData])

  
  const url = `https://api.marlin.ge/api/RetroBonusDetsilsFront/${selectedShop?.shopID}/${retroBonusID}`

  const { isLoading, error, data } = useQuery({
    queryKey: ["retro-bonus-details", retroBonusID, selectedShop?.shopID],
    queryFn: () => fetchData(url),
    enabled: Boolean(selectedShop?.shopID)
    
  });

  const [rowData, setRowData] = useState(() => {
    if (data || data?.data) {
      return data.data;
    }
    return null;
  });

  
  console.log(shopsData, "shop data")
  console.log(data, "table data")
  console.log({selectedShop})

  const [columnDefs] = useState(getCashBackTableDefs(data?.data && data?.data[0].retroPercent));



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

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const gridRef = useRef(null);

  useRemoveId(gridApi, gridRef);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");

  const [gridReady, setGridReady] = useState(false);
  useCopyTable(gridReady);



  
  return (
    <>
      <header className="all-orders__header cash-back-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left cash-back-table-header-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 style={{ marginRight: 20 }} id="discunts">
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
                <p className="info-badge info-badge-mobile">
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
              rowData={rowData}
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
        <BonusTableCards data={rowData} />
      ) : (
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example  discounts-table discounts-table-with-groups cash-back-table copy-paste-table"
          style={{ minHeight: 595, width: "100%" }}
        >
          <Select
            className="react-select-container sla-select doscounts-table-select"
            classNamePrefix="react-select"
            options={shopsData?.data.map(shopObj => ({value: shopObj.name, label: shopObj.name, shopID: shopObj.shopID }))}
            onChange={handleShopChange}
            value={selectedShop}
            defaultValue={selectedShop}
           
          />
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

export default CashBackTable;
