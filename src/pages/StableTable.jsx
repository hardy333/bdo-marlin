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
// import fetch_XLSX_DATA from "../utils/getData";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import "../styles/stable-table.css";
import { useQuery } from "react-query";
import { OrderDetailsDefs, orderDetailsHeaderList } from "../column-definitions/OrderDetailsDefs";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../utils/fetchData";

const StableTable = () => {

  const [headerList, setHeaderList] = useState(orderDetailsHeaderList);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [searchParams] = useSearchParams();

  const orderID =
  searchParams.get("orderID") || "6670e89b-306f-11ee-8123-005056b5a0aa";

  const url = `https://10.0.0.202:5001/api/OrderDetailsFront/${orderID}`;

  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["stable-table", orderID],
      queryFn: () => fetchData(url)
    }
  );

  console.log(data)


  const [columnDefs] = useState(OrderDetailsDefs);


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
  const startCellRef = useRef(null);
  const endCellRef = useRef(null);

  const tBodyMouseDown = (e) => {
    clearColoredCells();
    const cell = e.target.closest(".ag-cell");
    const row = e.target.closest(".ag-row");
    cell.classList.add("cell-copy-paste-active");

    if (!cell || !row) return;

    startCellRef.current = cell;

    const [x, y] = getXY(cell, row);
  };

  const tBodyMouseMove = (e) => {
    if (!startCellRef.current) return;
    const cell = e.target.closest(".ag-cell");
    const row = e.target.closest(".ag-row");

    const startRow = startCellRef.current.closest(".ag-row");

    endCellRef.current = cell;

    const [x1, y1] = getXY(startCellRef.current, startRow);
    const [x2, y2] = getXY(cell, row);

    clearColoredCells();

    if (x1 <= x2 && y1 <= y2) {
      colorCells(x1, y1, x2, y2);
    } else if (x1 > x2 && y1 <= y2) {
      colorCells(x2, y1, x1, y2);
    } else if (x1 <= x2 && y1 > y2) {
      colorCells(x1, y2, x2, y1);
    } else if (x1 > x2 && y1 > y2) {
      colorCells(x2, y2, x1, y1);
    }

   
  };

  const tBodyMouseUp = (e) => {
    startCellRef.current = null;
    // clearColoredCells()
  };

  const getXY = (cell, row) => {
    const x = Number(cell.getAttribute("aria-colindex"));
    const y = Number(row.getAttribute("row-index"));
    return [x, y];
  };

  const colorCells = (x1, y1, x2, y2) => {
    for (let i = y1; i <= y2; i++) {
      const row = document.querySelector(`.ag-row[row-index='${i}']`);
      for (let j = x1; j <= x2; j++) {
        const cell = row.querySelector(`.ag-cell[aria-colindex='${j}']`);
        cell.classList.add("cell-copy-paste-active");
      }
    }
  };

  const clearColoredCells = () => {
    document.querySelectorAll(".cell-copy-paste-active").forEach((cell) => {
      cell.classList.remove("cell-copy-paste-active");
    });
  };

  useEffect(() => {
    if (!gridReady) return;
    const tBody = document.querySelector(".copy-paste-table .ag-body");

    tBody.addEventListener("mousedown", tBodyMouseDown);
    tBody.addEventListener("mousemove", tBodyMouseMove);
    tBody.addEventListener("mouseup", tBodyMouseUp);

    window.addEventListener("keydown", keyDown);

    return () => {
      tBody.removeEventListener("mousedown", tBodyMouseDown);
      tBody.removeEventListener("mousemove", tBodyMouseMove);
      tBody.removeEventListener("mouseup", tBodyMouseUp);
      window.removeEventListener("keydown", keyDown);
    };
  }, [gridReady]);

  const keyDown = (e) => {
    console.log(e.code, e.key, e.ctrlKey, e.code === "KeyC");
    if (e.code === "KeyC" && e.ctrlKey) {
      console.log(111);
      copyToClop();
      flashCells();
    }
  };

  const flashCells = () => {
    document.querySelectorAll(".cell-copy-paste-active").forEach((cell) => {
      cell.classList.add("cell-flash");
    });
  };

  const copyToClop = () => {
    // Step 1: create a textarea element.
    // It is capable of holding linebreaks (newlines) unlike "input" element
    const mySmartTextarea = document.createElement("textarea");

    const text = generateCopyText();

    // Step 2: Store your string in innerHTML of mySmartTextarea element
    mySmartTextarea.innerHTML = text || "";

    // Step3: find an id element within the body to append your mySmartTextarea there temporarily
    const parentElement = document.getElementById("root");
    parentElement.appendChild(mySmartTextarea);

    // Step 4: Simulate selection of your text from mySmartTextarea programmatically
    mySmartTextarea.select();

    // Step 5: simulate copy command (ctrl+c)
    // now your string with newlines should be copied to your clipboard
    document.execCommand("copy");

    // Step 6: Now you can get rid of your "smart" textarea element
    parentElement.removeChild(mySmartTextarea);

    setTimeout(() => {
      document.querySelectorAll(".cell-flash").forEach((cell) => {
        cell.classList.remove("cell-flash");
      });
    }, 10);
  };

  const generateCopyText = () => {
    let text = "";

    const endColIndex = endCellRef.current.getAttribute("aria-colindex");
    let prevColIndex = null;
    let firstColIndex = null;

    document.querySelectorAll(".cell-copy-paste-active").forEach((cell, i) => {
      const colIndex = Number(cell.getAttribute("aria-colindex"));
      if (i === 0) {
        firstColIndex = colIndex;
      }

      let cellText = cell.textContent;
      let newText = "";

      if (prevColIndex && colIndex <= prevColIndex) {
        newText = "\n" + cellText;
      } else if (prevColIndex === null && i === 0) {
        newText = cellText;
      } else {
        newText = "\t" + cellText;
      }

      text += newText;

      console.log(text);

      console.log(colIndex, prevColIndex);

      prevColIndex = Number(colIndex);
    });

    return text;
  };

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
      </header>
      <div
        className="ag-theme-alpine stable-table copy-paste-table"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          rowData={data?.data}
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
