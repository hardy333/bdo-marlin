import React, { useEffect, useMemo, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/ag-table-scrollbar.css";
import { AgGridReact } from "ag-grid-react";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";
import "../styles/expandable-table.css"


import data from "../assets/REPORT_CHILD.json"


// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import CustomHeaderCell from "../components/CustomHeaderCell";
import "../styles/stable-table.css";



const ExpandableTable = () => {
  const [headerList, setHeaderList] = useState([
    {
      name: "Number",
      isShowing: true,
    },
    {
      name: "Item",
      isShowing: true,
    },
    {
      name: "Ordered",
      isShowing: true,
    },
    {
      name: "Delivered",
      isShowing: true,
    },
    {
      name: "In time",
      isShowing: true,
    },
    {
      name: "Service Level",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(null);


  const [columnDefs] = useState([
    {
      field: "Number",
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span className="plus-minus-span">+</span>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
    {
      field: "Item",
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
    {
      field: "Ordered",
      cellStyle: (params) => ({ color: +params.value > 800 ? "" : "#F55364" }),
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
    {
      field: "Delivered",
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
    {
      field: "In time",
      cellStyle: (params) => {
        if (params.value === "Yes") {
          return {
            color: "#FFC23C",
            fontWeight: 600,
          };
        } else {
          return {
            color: "#6E0FF5",
            fontWeight: 600,
          };
        }
      },
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
    {
      field: "Service level",
      minWidth: 150,
      cellRenderer:  (props) => {
        const {value} = props
        return <div>
            <span>{value}</span>
            <div className="custom-col-container"></div>
        </div>
      }
    },
  ]);


  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);



  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    floatingFilter: false,
    suppressMovable: false,
    width: 1385 / headerList.filter((obj) => obj.isShowing).length,
    minWidth: 150,

  }));

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    // gridRef.current.api.resetRowHeights();
    setGridReady(true);

    params.api.sizeColumnsToFit();
  };


  const [gridReady, setGridReady] = useState(false);

  // Expandable logic    
  // Expandable logic  

  const renderSubTable = () => {
    
    data.forEach((obj, index) => {
      const val1 = obj["Order #"]
      const val2 = obj["Order Address"]
      const val3 = obj["Quantity Deviation"]
      const val4 = obj["In Time Orders"]
      const val5 = obj["Service Level"]
      const val6 = obj["ip_address"]

      const arr = [val1, val2, val3, val4, val5,val6]

      const cells = expandedRow.current.querySelectorAll(".ag-cell")
      console.log(cells, expandedRow.current)
      cells.forEach((cell, index) => {
        const columnContainer = cell.querySelector(".custom-col-container")

        const newCell = document.createElement("DIV")
        
        if(index === 0){
          newCell.innerHTML = `<span class="plus-minus-span plus-minus-span-2" style="padding-right: 10px;">+</span>` + arr[index]

        }else{
          newCell.textContent = arr[index]

        }
        
        columnContainer.append(newCell)


      })

    })
    
  }
  
  
  
  const gridRef = useRef(null);

    
  const [openedRowId, setOpenedRowId] = useState(null);
  const expandedRow = useRef(null)
  const expandedRowId = useRef(null)

  const expandLevel2 = () => {

  }

  useEffect(() => {
    const tBody = document.querySelector(
      ".expandable-table .ag-body"
    );

    if (!tBody) return;

    const handleGridClick = (e) => {  
      const target = e.target;
      if(!target.classList.contains("plus-minus-span")){
        return
      }
      
      if(target.classList.contains("plus-minus-span-2")){
        expandLevel2()
        return
      }
      
      const cell = target.closest(".ag-cell");
      const row = target.closest(".ag-row");
      const rowId = +row.getAttribute("row-id");


      const colName = cell.getAttribute("col-id");



      if(expandedRowId.current === rowId){
        expandedRow.current = null
        expandedRowId.current = null
        row.querySelector(".plus-minus-span").textContent = "+"
        row.classList.remove("opened")

      }else{
        expandedRow.current = row
        expandedRowId.current = rowId
        row.querySelector(".plus-minus-span").innerHTML = "-"
        row.classList.add("opened")
        renderSubTable()
      }



        gridRef.current.api.resetRowHeights();

 
    }

    tBody.addEventListener("click", handleGridClick);

    return () => {
      tBody.removeEventListener("click", handleGridClick);
    };


    
  }, [gridApi]);

  
  function getRowHeight(params) {
    const { id } = params.node;
    if (id == expandedRowId.current) {
      return 41.6*10 +1
    }

  
  }

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        
      </header>
      <div
        className="ag-theme-alpine stable-table expandable-table"
        style={{ minHeight: 595, width: "100%",  }}
      >
        <AgGridReact
          ref={gridRef}



        //   animateRows={true}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressHorizontalScroll={true}
          components={components}
          getRowHeight={getRowHeight}
        ></AgGridReact>
      </div>
    </>
  );
};

export default ExpandableTable;
