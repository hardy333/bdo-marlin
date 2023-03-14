import React, { useEffect, useMemo } from "react";
import { COLUMNS_BY_ITEM, COLUMNS_BY_SHOP } from "../columns.js";
import { useTable, usePagination, useSortBy } from "react-table";
import "../styles/table.css";
import cross from "../assets/icons/cross.png";
import check from "../assets/icons/check.png";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import TablePagination from "./TablePagination.jsx";

const Table = ({ tableData, type, option, searchValue }) => {
  const columns = useMemo(
    () => (type === "By shop" ? COLUMNS_BY_SHOP : COLUMNS_BY_ITEM),
    [type]
  );

  const data = useMemo(() => {
    return tableData.filter((product) => {
      if (type === "By item") {
        return product["Product Category"] === option;
      } else {
        return product["Address"] === option;
      }
    });
  }, [tableData, option]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,

    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 7 },
      disableSortBy: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let td = cell.render("Cell");

                    // In service level
                    if (cell.column.Header === "Service Level") {
                      td = Math.round(Number(cell.value) * 100) + "%";
                    }

                    // Amount
                    if (cell.column.Header === "Amount") {
                      td = cell.value + " GEL";
                    }

                    // In time
                    if (cell.column.Header === "In Time") {
                      td =
                        cell.value === "No" ? (
                          <img src={cross} />
                        ) : (
                          <img src={check} />
                        );
                    }

                    return <td {...cell.getCellProps()}>{td}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </>
  );
};

export default Table;
