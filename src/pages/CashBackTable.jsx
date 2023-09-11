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
  CashBackTableDefs,
  cashBackTableHeaderList,
} from "../column-definitions/CashBackTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import { BsCashCoin } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

import Tippy from "@tippyjs/react";
import { useSearchParams } from "react-router-dom";
import BonusTableCards from "../components/BonusTableCards";
import useCopyTable from "../hooks/useCopyTable";

const shopsArr = [
  {
    value: "  აბაშა",
    label: "  აბაშა",
  },

  {
    value: "ამბროლაური, ჭრებალო #163",
    label: "ამბროლაური, ჭრებალო #163",
  },
  {
    value: "ბათუმი, ბრწყინავლე 42",
    label: "ბათუმი, ბრწყინავლე 42",
  },
  {
    value: "ბათუმი, გორგასალის 1",
    label: "ბათუმი, გორგასალის 1",
  },
  {
    value: "ბათუმი, ზუბალაშვილის N3",
    label: "ბათუმი, ზუბალაშვილის N3",
  },
  {
    value: "ბაკურაინი #161",
    label: "ბაკურაინი #161",
  },
  {
    value: "ბათუმი, ლერმონტო",
    label: "ბათუმი, ლერმონტო",
  },
  {
    value: "გურჯაანი, ბაკურციხე",
    label: "გურჯაანი, ბაკურციხე",
  },
  {
    value: "ზუგდიდი, გამსახურდიას 38",
    label: "ზუგდიდი, გამსახურდიას 38",
  },
  {
    value: "ზესტაფონი, სვირი 2",
    label: "ზესტაფონი, სვირი 2",
  },
  {
    value: "გორი",
    label: "გორი",
  },
  {
    value: "ვანი",
    label: "ვანი",
  },
  {
    value: "ზუგდიდი, სანაპიროს 10",
    label: "ზუგდიდი, სანაპიროს 10",
  },
  {
    value: "ქუთაისი 11",
    label: "ქუთაისი 11",
  },
  {
    value: "ბაღდათი, წერეთლის 18",
    label: "ბაღდათი, წერეთლის 18",
  },
  {
    value: "ამბროლაური, კოსტავას 6",
    label: "ამბროლაური, კოსტავას 6",
  },
];

const CashBackTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [columnDefs] = useState(CashBackTableDefs);

  const [searchParams] = useSearchParams();
  const retroBonusID =
    searchParams.get("retroBonusID") || "19ac6fd7-7f9e-11e8-80ef-005056b569bf";
  const shopID = "3639a8cd-4df3-4f6a-801a-8f1ffce2a055";

  const documentNo = searchParams.get("documentNo");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const vendor = searchParams.get("vendor");

  const condition = searchParams.get("condition");
  const planAmount = searchParams.get("planAmount");

  const url =
    "https://10.0.0.202:5001/api/RetroBonusDetsilsFront/" +
    shopID +
    "/" +
    retroBonusID;

  const { isLoading, error, data } = useQuery("retro-bonus-details", () =>
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
    setGridReady(true)
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
  useCopyTable(gridReady)

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
                  <img src="order-details/vendor.svg" alt="" />
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
                  <img src="cash-back/shetanxmebis-piroba.svg" alt="" />
                  <span className="info-badge-text"> {condition}</span>
                </p>
              </Tippy>
              {/* 3 */}
              <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`პერიოდი: ${startDate?.split("T")[0]} - ${
                  endDate || "განუსაზღვრელი"
                } `}
              >
                <p className="info-badge info-badge-mobile">
                  <img src="order-details/calendar.svg" alt="" />
                  <span className="info-badge-text info-badge-text__date">
                    {startDate?.split("T")[0]} - {endDate || "განუსაზღვრელი"}
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
                  <img src="cash-back/document-number.svg" alt="" />

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
                  <img src="cash-back/gegma.svg" alt="" />

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
                content="ქეშბექი: 7%"
              >
                <p className="info-badge info-badge-mobile">
                  <img src="cash-back/cashback.svg" alt="" style={{height: "22px"}} />

                  <span className="info-badge-text"> 7%</span>
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
            options={shopsArr}
            defaultValue={{
              value: "ბათუმი, ზუბალაშვილის N3",
              label: "ბათუმი, ზუბალაშვილის N3",
            }}
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
        </div>
      )}
    </>
  );
};

export default CashBackTable;
