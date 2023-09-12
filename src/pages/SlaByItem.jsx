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
import "../styles/sla-by-vendors-table.css";

import Select from "react-select";


const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import vendorsArr from "../data/vendors-data";
import useRemoveId from "../components/useRemoveId";
import { useQuery } from "react-query";
import SlaMenu from "../components/SlaMenu";
import { fetchData } from "../utils/fetchData";
import { useMediaQuery } from "@uidotdev/usehooks";
import SlaItemsCards from "../components/SlaItemsCards";
import DatePickerInput from "../components/DatePickerInput";
import TableSettings from "../components/TableSettings";
import { SlaByItemsTableDefs, slaByitemsTableHeaderList } from "../column-definitions/SlaByItemsTableDefs";
import useCopyTable from "../hooks/useCopyTable";
import AgTablePag from "../components/AgTablePag";

const SlaByItem = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const url1 = window.location.origin + "/SLAByProducts.json"
  const url = "https://10.0.0.202:5001/api/SLAByProducts";


  const { isLoading, error, data } = useQuery("repoData", () => fetchData(url1));

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

  const [columnDefs] = useState(SlaByItemsTableDefs);


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

  // Row Height logic
  // Row Height logic



  const [rowHeightIndex, setRowHeightIndex] = useState(1);


  const gridRef = useRef(null);


 
  const isSmallDevice = useMediaQuery("only screen and (max-width : 530px)");

  
  useRemoveId(gridApi, gridRef);


  const [gridReady, setGridReady] = useState(false);
  useCopyTable(gridReady)




  return (
    <>
      <header className="all-orders__header sla-by-vendors__header sla-header">
        <div className="all-orders__settings sla-by-vendors__settings">
          {/* Left */}
          <div
            className="order-details-left sla-top"
            style={{ paddingLeft: "0", marginLeft: 0 }}
          >
            <h4 className="sla-heading">სერვისის დონე</h4>
            <div className="sla-date">
              <div className={`flex items-center sla-date `}>
                <span
                
                  className="calendar-span"
                >
                  <DatePickerInput />
                </span>
              </div>
            </div>
            <Select
              className="react-select-container sla-select"
              classNamePrefix="react-select"
              options={vendorsArr}
              defaultValue={{ value: "მომწოდებელი 1", label: "მომწოდებელი 1" }}
            />
            {/* <ItemsMenu isSlaVendors={true} /> */}
            <SlaMenu className="sla-menu" />
            <p className="avarage-sla sla-avg sla-avg-desktop">
              ASL: <span>82%</span>
            </p>
          </div>

          {/* Right */}
          <div className="all-orders__settings__options">
            <p className="avarage-sla sla-avg sla-avg-mobile">
              ASL: <span>82%</span>
            </p>
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={slaByitemsTableHeaderList}
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
     {
      isSmallDevice ? <SlaItemsCards data={rowData}/> : (
        <div
        id="marlin-table"
        className="ag-theme-alpine ag-grid-example sla-colored-cell-table copy-paste-table"
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
      )
     }
    </>
  );
};

export default SlaByItem;
