import React, { useEffect, useRef } from 'react'

import toast  from "react-hot-toast";



const useCopyTable = (gridReady) => {
    
  // Table Copy STARt
  // Copy paste
  // Copy paste

  // const [startCell, setStartCell] = useState(null)
  const startCellRef = useRef(null);
  const endCellRef = useRef(null);

  const tBodyMouseDown = (e) => {
    clearColoredCells();
    const cell = e.target.closest(".ag-cell");
    const row = e.target.closest(".ag-row");
    if (!cell || !row) return;

    
    cell.classList.add("cell-copy-paste-active");


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
    // console.log(e.code, e.key, e.ctrlKey, e.code === "KeyC");
    if (e.code === "KeyC" && e.ctrlKey) {
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

    toast.success("მონაცემების კოპირება", {
      position: "top-right"
    })
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
      const statusCell = cell.querySelector(".ag-cell-status-value")

      if(statusCell){
        cellText = statusCell.textContent
      }
      
      
      let newText = "";

      if (prevColIndex && colIndex <= prevColIndex) {
        newText = "\n" + cellText;
      } else if (prevColIndex === null && i === 0) {
        newText = cellText;
      } else {
        newText = "\t" + cellText;
      }

      text += newText;

    //   console.log(text);

    //   console.log(colIndex, prevColIndex);

      prevColIndex = Number(colIndex);
    });

    return text;
  };
  // Table Copy End
    
 
}

export default useCopyTable