import classNames from "classnames";
import React from "react";
import "../styles/pagination.css";

const TablePagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  nextPage,
  previousPage,
}) => {
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
    </div>
  );
};

export default TablePagination;
