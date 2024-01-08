import React, {
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

import "../styles/all-orders-parent.css";
import "../styles/vendors-calendar.css";
import "../styles/vendors-calendar-table.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";


import Select from "react-select";
import { DayPicker } from "react-day-picker";
import useRemoveId from "../components/useRemoveId";

import {
  CalendarTableDefs,
  calendarTableHeaderList,
} from "../column-definitions/CalendarTableDefs";
import TableSettings from "../components/TableSettings";
import { useMediaQuery } from "@uidotdev/usehooks";
import CalendartableCards from "../components/CalendarTableCards";
import useCopyTable from "../hooks/useCopyTable";

import useCustomerSelectMenu from "../hooks/useCustomerSelectMenu";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import { format } from "date-fns";
import ProgressBar from "../components/ProgressBar";

const VendorsCalendarTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [selected, setSelected] = useState(new Date());
  const [customers, selectedVendor, setSelectedVendor] = useCustomerSelectMenu()
  
  const { user } = useAuthContext();

  const formatedSelectedDay = format(new Date(selected), "MM/dd/yyyy")


  // Url for Retailer View 
  let url = `https://api.marlin.ge/api/Calendarfront?retailerId=${user.decodedToken.AccountID}&vendorId=${selectedVendor?.accountID}&date=${formatedSelectedDay}`


  // Url for Distributor View
  if (user.decodedToken.AccountID.slice(0, 1) === "D") {
   url = `https://api.marlin.ge/api/Calendarfront?retailerId=${selectedVendor?.accountID}&vendorId=${user.decodedToken.AccountID}&date=${formatedSelectedDay}`

  }

  

  const { isLoading, error, data } = useQuery({
    queryKey: ["calendar-table-data", selected, selectedVendor?.accountID],
    queryFn: () => fetchData(url),
  });
  

  

  const gridRef = useRef(null);

  const [columnDefs] = useState(CalendarTableDefs);

  const [rowDataLabel, setRowDataLabel] = useState("d1");



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


  useRemoveId(gridApi, gridRef);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");

  const [gridReady, setGridReady] = useState(false);

  useCopyTable(gridReady);




  

  return (
    <>
      <header className="all-orders__header calendar-table-header vendors-calendar-header "
        style={{ position: "relative" }}

      >
        <ProgressBar show={isLoading} />
        <div className="all-orders__settings">

          {/* Left */}
          <div
            className="all-orders__gdm-container  order-details-left "
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <span className="me-10 heading">მომწოდებლების კალენდარი</span>

            <Select
              placeholder=""
              className="react-select-container"
              classNamePrefix="react-select"
              options={customers}
              value={selectedVendor}
              defaultValue={selectedVendor}
              onChange={(customer) => {
                setSelectedVendor(customer)

              }}
            />
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={calendarTableHeaderList}
              rowData={data?.data}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="calendar-table-data"
            />
          </div>
        </div>
      </header>
      {/* ..... */}
      <div className="flex gap-2">
        <div className="vendors-calendar__left">
          <div className=" date-picker-wrapper">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(x) => {
                setSelected(x);
              }}
              showOutsideDays={true}
              enableOutsideDaysClick={false}
            />
          </div>
        </div>

        {isSmallDevice ? (
          <CalendartableCards data={rowData} />
        ) : (
          <div
            id="marlin-table"
            className="ag-theme-alpine ag-grid-example copy-paste-table "
            style={{ minHeight: 595, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              getRowHeight={() => {
                if (rowHeightIndex === 0) {
                  return 25;
                } else if (rowHeightIndex === 1) {
                  return 32;
                } else if (rowHeightIndex === 2) {
                  return 37;
                }
              }}
              onGridReady={onGridReady}
              rowData={data?.data}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              components={components}
              paginationPageSize={pageSize}
              suppressHorizontalScroll={true}
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
      </div>
    </>
  );
};

export default VendorsCalendarTable;
