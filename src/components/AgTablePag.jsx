import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { createPortal } from "react-dom";
import "../styles/pag-test.css"


const AgTablePag = ({ gridRef, pageCount, tablePage, setTablePage }) => {

  const changePage = (event) => {
    gridRef.current.api.paginationGoToPage(event.selected);
    setTablePage && setTablePage(Number(event.selected))

    // console.log("in Change page function", tablePage, {pageCount})
  };



  if (document.querySelector(".ag-paging-panel")) {
    return createPortal(
      <div className="pag-container">
        <ReactPaginate
          breakLabel="..."
          previousLabel="&larr;"
          nextLabel="&rarr;"
          onPageChange={changePage}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          initialPage={Number(tablePage > pageCount ? 0 : tablePage)}
          // needed when tablePage changes independent to reactPaginate 
          forcePage={tablePage || 0}
          
        />
      </div>,
      document.querySelector(".ag-paging-panel")
    );
  } else {
    return null;
  }
};

export default AgTablePag;
