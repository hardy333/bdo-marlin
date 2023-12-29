import React, { useEffect, useMemo, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../../styles/ag-table-scrollbar.css";

// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../../styles/all-orders.css";
import "../../styles/global-filter-input.css";
import "../../styles/order-details.css";
import "../../styles/pending-status-menu.css";
import "../../styles/catalogue-table.css";
import Select from "react-select";

// images

const pageSizes = [5, 10, 15, 20, 25, 30];
import "../../styles/catalogue.css";

// css
import "../../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../../components/CustomHeaderCell";
import CustomInput from "../../components/CustomInput";

import AgTablePag from "../../components/AgTablePag";
import CatalogueMenu from "../../components/CatalogueMenu";
import useRemoveId from "../../components/useRemoveId";
import { useQuery } from "react-query";
import ProgressBar from "../../components/ProgressBar";
import { fetchData } from "../../utils/fetchData";
import { useMediaQuery } from "@uidotdev/usehooks";
import MobileCatalogueMenu from "../../components/MobileCatalogueMenu";
import { BiFoodMenu } from "react-icons/bi";
import CatalogueCards from "../../components/CatalogueCards";
import {
  CatalogueTableDefs,
  catalogueTableHeaderList,
} from "../../column-definitions/CatalogueTableDefs";
import TableSettings from "../../components/TableSettings";
import vendorsArr from "../../data/vendors-data";
import useCopyTable from "../../hooks/useCopyTable";
import { useAuthContext } from "../../hooks/useAuthContext";
import NewCatMenu from "../../components/NewCatMenu";
import { useSearchParams } from "react-router-dom";

const VendorsCatalogue = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [subCatId, setSubCatId] = useState(
    "e1307628-f308-11ed-8120-005056b5a0aa"
  );

  const { user } = useAuthContext();
  const [selectedVendor, setSelectedVendor] = useState(null);

  const [isMyProducts, setIsMyProducts] = useState(true);

  const url = `https://api.marlin.ge/api/CatalogueFront/${
    isMyProducts ? user.decodedToken.AccountID : selectedVendor.accountID
  }/${subCatId}`;

  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ["catalogueTableData", subCatId],
    queryFn: () => fetchData(url),
    select: (data) => {
      return data.data;
    },
  });


  useEffect(() => {
    refetch();
  }, [selectedVendor, isMyProducts]);


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

  const [columnDefs] = useState(CatalogueTableDefs);

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

  // --------//
  // --------//
  const [isHover, setIsHover] = useState(false);

  const [gridReady, setGridReady] = useState(false);

  useRemoveId(gridApi, gridRef);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 610px)");

  const [showCatalogue, setShowCatalogue] = useState(false);
  const [cat, setCat] = useState("სასუსნავები");
  const [prod, setProd] = useState("ჩიფსი");

  const handleVendorChange = (vendor) => {
    window.localStorage.setItem(
      "catalogue-selected-vendor",
      JSON.stringify(vendor)
    );
    setSelectedVendor(vendor);
  };


  useCopyTable(gridReady);

  const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront";
  const {
    isLoading: vendorsIsLoading,
    error: vendorsError,
    data: vendorsData,
  } = useQuery({
    queryKey: ["retailers"],
    queryFn: () => fetchData(vendorsUrl),
    select: (data) => {
      return data.data;
    },
  });


  const vendors = vendorsData?.data
    .filter((account) => account.isRetail)
    .map((acc) => ({
      value: acc.name,
      label: acc.name,
      accountID: acc.accountID,
    }));

    const [searchParams,setSearchParams] = useSearchParams();


    const urlSelectedVendor = searchParams.get("vendor")


  useEffect(() => {
    if (!vendors || !vendorsData) return;
    if (selectedVendor) return;

    const vendor = vendors.find(ven => ven.value === urlSelectedVendor)

    if(!vendor){
      setSelectedVendor(vendors[0]);
    }else{
      setSelectedVendor(vendor);
      setIsMyProducts(false)

    }
  }, [vendorsData]);

  return (
    <>
      <header
        className="all-orders__header catalogue-header"
        style={{ position: "relative" }}
      >
        <ProgressBar show={isLoading} />
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left catalogue-header-top"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4 className="heading">
              კატალოგი
              <div className="heading-label-container">
                <span className="label label-cat"> {cat}</span>
                <span className="label label-arrow"> - </span>
                <span className="label label-prod">{prod}</span>
              </div>
            </h4>
            <div className="vendors-switch-container">
              <p className="catalogue-label">ჩემი კატალოგი</p>
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  checked={!isMyProducts}
                  onChange={() => setIsMyProducts(!isMyProducts)}
                  id="toggle"
                  type="checkbox"
                />
                <label className="toggle-label" htmlFor="toggle"></label>
              </div>
              <p className="catalogue-label">რითეილერების კატალოგი</p>
            </div>

            {
                isMyProducts ? null : (

                  <Select
                  onChange={handleVendorChange}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={vendors}
                  value={selectedVendor}
                  defaultValue={selectedVendor}
                  defaultMenuIsOpen={false}
                />
                )
            }
        
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            {isSmallDevice ? (
              <div className="mobile-cat-container">
                <button onClick={() => setShowCatalogue(!showCatalogue)}>
                  <BiFoodMenu />
                </button>
                <div
                  className={`mobile-catalogue-menu-container ${
                    showCatalogue ? "show" : "hide"
                  }`}
                >
                  <MobileCatalogueMenu
                    setCat={setCat}
                    setProd={setProd}
                    setShowCatalogue={setShowCatalogue}
                    setSubCatId={setSubCatId}
                  />
                </div>
              </div>
            ) : null}
            <TableSettings
              isSmallDevice={isSmallDevice}
              defHeaderList={catalogueTableHeaderList}
              rowData={rowData}
              gridApi={gridApi}
              gridRef={gridRef}
              gridColumnApi={gridColumnApi}
              rowHeightIndex={rowHeightIndex}
              setRowHeightIndex={setRowHeightIndex}
              pageName="catalogue"
            />
          </div>
        </div>
      </header>
      <div className="flex gap-2">
        {/* Categories */}
        {isSmallDevice ? null : (
          // <div className="catalogue-menu-container">
          //   <CatalogueMenu
          //     user={user}
          //     isMyProducts={isMyProducts}
          //     setSubCatId={setSubCatId}
          //   />
          // </div>
          <NewCatMenu
            setSubCatId={setSubCatId}
            isMyProducts={isMyProducts}
            selectedVendor={selectedVendor}
          />
        )}

        {isSmallDevice ? (
          <CatalogueCards data={rowData} />
        ) : (
          <div
            id="marlin-table"
            className="ag-theme-alpine ag-grid-example copy-paste-table"
            style={{ minHeight: 595, width: "100%", position: "relative" }}
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
      </div>
    </>
  );
};

export default VendorsCatalogue;
