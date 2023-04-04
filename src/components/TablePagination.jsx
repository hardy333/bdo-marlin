import classNames from "classnames";
import React from "react";
import "../styles/pagination.css";
import Select from "react-select";


const TablePagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  nextPage,
  previousPage,
  setPageSize,
  pageSize
}) => {
  const pageSizeOptions = [15,20,25,30,50,100].map((pageSize) => ({
    value: pageSize,
    label: pageSize,
  }));
  
  
  return (
    <div className="pagination-wrapper">
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {"<"}
      </button>
      {pageOptions.map((index) => (
        <button
          key={index}
          onClick={() => gotoPage(index)}
          className={classNames({ active: index === pageIndex })}
        >
          {index}
        </button>
      ))}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </button>{" "}

      <div className="pagination-options-container">
        {/* <select name="tablePageSize" id="tablePageSize">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> */}

        <Select
        id="pageSize"
        name="pageSize"
        value={{ value: pageSize, label: pageSize }}
        options={pageSizeOptions}
        menuPlacement="top"
        onChange={(value) => {
          console.log(value)
          setPageSize(+value.value)
        }}
      />

      </div>
    </div>
  );
};

export default TablePagination;
