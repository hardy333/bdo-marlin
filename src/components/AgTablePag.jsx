import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactPaginate from "react-paginate";
import { createPortal } from "react-dom";

const AgTablePag = ({ gridRef }) => {
  const changePage = (event) => {
    gridRef.current.api.paginationGoToPage(event.selected);
  };

  useEffect(() => {
    const x = document.getElementById("ag-3");
    console.log(x);
  }, []);

  if (document.getElementById("ag-3")) {
    return createPortal(
      <div className="pag-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={changePage}
          pageCount={4}
          pageRangeDisplayed={2}
          previousLabel="<"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
        />
      </div>,
      document.getElementById("ag-3")
    );
  } else {
    return null;
  }
};

export default AgTablePag;
