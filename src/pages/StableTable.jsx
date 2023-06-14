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

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import "../styles/stable-table.css";

const StableTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    },
    {
      field: "Item",
    },
    {
      field: "Ordered",
      cellStyle: (params) => ({ color: +params.value > 800 ? "" : "#F55364" }),
    },
    {
      field: "Delivered",
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
    },
    {
      field: "Service level",
      minWidth: 150,
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

  // Copy paste 
  // Copy paste 

  // const [startCell, setStartCell] = useState(null)
  const startCellRef = useRef(null)
  const endCellRef = useRef(null)
  
  const tBodyMouseDown = (e) => {
    console.log("Mouse Click")
    clearColoredCells()
    const cell = e.target.closest(".ag-cell")
    const row = e.target.closest(".ag-row")
    cell.classList.add("cell-copy-paste-active")

    if(!cell || !row) return

    startCellRef.current = cell

    const [x,y] = getXY(cell, row)


    

    
  }

  const tBodyMouseMove = (e) => {
    if(!startCellRef.current) return;
    console.log("Mouse Move")
    const cell = e.target.closest(".ag-cell")
    const row = e.target.closest(".ag-row")

    const startRow = startCellRef.current.closest(".ag-row")
    console.log(startRow)

    endCellRef.current = cell
    
    const [x1,y1] = getXY(startCellRef.current, startRow)
    const [x2,y2] = getXY(cell, row)

      colorCells(x1,y1,x2,y2)

    
    // if(y1 <= y2 && x1 <= x2){
    //   colorCells(x1,y1,x2,y2)
    // }else if(y1 > y2 && x1 <= x2){
    //   colorCells(x2,y2, x1, y1)
    // }else if(y1 <= y2 && x1 > x2){
    //   colorCells(x1,y2, x2, y1)

    // }else if(y1 > y2 && x1 > x2){
    //   colorCells(x2,y2, x1, y1)
    // }
    
  }

  const tBodyMouseUp = (e) => {
    startCellRef.current = null
    console.log("Clear", startCellRef.current)
    // clearColoredCells()

  }

  const getXY = (cell, row) => {
    const x = Number(cell.getAttribute("aria-colindex"))
    const y = Number(row.getAttribute("row-index"))
    return [x,y]
  }

  const colorCells = (x1,y1,x2,y2) => {
    for(let i = y1; i <= y2; i++){
      const row = document.querySelector(`.ag-row[row-index='${i}']`)
      for(let j = x1; j <= x2; j++){
        const cell = row.querySelector(`.ag-cell[aria-colindex='${j}']`)
        cell.classList.add("cell-copy-paste-active")
      }
    }

  }

  const clearColoredCells = () => {
    document.querySelectorAll(".cell-copy-paste-active").forEach(cell => {
      cell.classList.remove("cell-copy-paste-active")
    })

  }



  useEffect(() => {
    if(!gridReady) return
    const tBody = document.querySelector(".copy-paste-table .ag-body")

    console.log(tBody)

    tBody.addEventListener("mousedown", tBodyMouseDown)
    tBody.addEventListener("mousemove", tBodyMouseMove)
    tBody.addEventListener("mouseup", tBodyMouseUp)

    window.addEventListener("keydown", keyDown)
   


    return () => {
      tBody.removeEventListener("mousedown", tBodyMouseDown)
      tBody.removeEventListener("mousemove", tBodyMouseMove)
      tBody.removeEventListener("mouseup", tBodyMouseUp)
      window.removeEventListener("keydown", keyDown)

      
    }
    
  },[gridReady])

  const keyDown = (e) => {
    copyToClop()
  }

  const copyToClop = () => {
    console.log("Copy")
        // Step 1: create a textarea element.
        // It is capable of holding linebreaks (newlines) unlike "input" element
        const mySmartTextarea = document.createElement('textarea');

        const text = generateCopyText()
        
        // Step 2: Store your string in innerHTML of mySmartTextarea element        
        mySmartTextarea.innerHTML = text || ""
        
        // Step3: find an id element within the body to append your mySmartTextarea there temporarily
        const parentElement = document.getElementById('root');
        parentElement.appendChild(mySmartTextarea);
        
        // Step 4: Simulate selection of your text from mySmartTextarea programmatically 
        mySmartTextarea.select();
        
        // Step 5: simulate copy command (ctrl+c)
        // now your string with newlines should be copied to your clipboard 
        document.execCommand('copy');

        // Step 6: Now you can get rid of your "smart" textarea element
        parentElement.removeChild(mySmartTextarea);



  }
  


  const generateCopyText = () => {
    let text = ""
    
    console.log(endCellRef.current)
    const endColIndex = endCellRef.current.getAttribute("aria-colindex")
    
    document.querySelectorAll(".cell-copy-paste-active").forEach(cell => {

      text += cell.textContent + "    "
      const colIndex = cell.getAttribute("aria-colindex")

      if(endColIndex === colIndex){
        text += "\n"
      }
    })

    return text
    
  }

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        
      </header>
      <div
        className="ag-theme-alpine stable-table copy-paste-table"
        style={{ minHeight: 595, width: "100%",  }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressHorizontalScroll={true}
          components={components}
          getRowHeight={(props) => {
            if (2 === 0) {
              return 25;
            } else if (1 === 1) {
              return 32;
            } else if (3 === 2) {
              return 37;
            }
          }}
        ></AgGridReact>
      </div>
    </>
  );
};

export default StableTable;
