import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";

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

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import "../styles/discounts-table-2.css";

import d from "../assets/cashBack.json";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import ExpandingInput from "../components/ExpandingInput";
import useFilterToggle from "../hooks/useFilterToggle";
import Select from "react-select";

import "../styles/discounts-table.css";
import useRemoveId from "../components/useRemoveId";

import ExcelExportBtn from "../components/ExcelExportBtn";
import { CashBackTableDefs, cashBackTableHeaderList } from "../column-definitions/CashBackTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";

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
  const [headerList, setHeaderList] = useState(cashBackTableHeaderList);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d);

  const [columnDefs] = useState(CashBackTableDefs);

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

  const [rowHeightsArr, setRowHeightsArr] = ["small", "medium", "big"];
  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };
  const gridRef = useRef(null);

  const [showFilters, setShowFilters] = useFilterToggle(true);

  useRemoveId(gridApi, gridRef);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");


  return (
    <>
      <header className="all-orders__header cash-back-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 style={{ marginRight: 20 }} id="discunts">
              რეტრო ბონუსები
            </h4>
            {/* 1 */}
            <div className="info-group">
              <p className="discount-container">
                მომწოდებელი:<span> GDM.</span>
              </p>
              <p className="discount-container">
                პირობა:<span> შეძენიდან. </span>
              </p>
            </div>
            {/* 2 */}
            <div className="info-group">
              <p className="discount-container">
                დოკ. #:<span> 23120.</span>
              </p>
              <p className="discount-container">
                ქეშბექი:<span> 7%.</span>
              </p>
            </div>

            {/* 3 */}
            <div className="info-group">
              <p className="discount-container">
                პერიოდი: <span>1/10/2023 - 10/10/2023.</span>
              </p>
              <p className="discount-container">
                გაყიდვის გეგმა: <span>25,000GEL.</span>
              </p>
            </div>
            <div>
            <Menu
              className="pending-status-menu"
              menuButton={
                <button
                  className="btn btn-status-2 mt-[-2px] discount-conditions"
                >
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
                {/* <p className="">ფასდაკლების პირობები</p> */}
            </div>

            {/* <ItemsMenu /> */}
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
          <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={cashBackTableHeaderList}
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
        id="marlin-table"
        className="ag-theme-alpine ag-grid-example  discounts-table discounts-table-with-groups cash-back-table"
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
    </>
  );
};

export default CashBackTable;
