import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/switch.css";
import ReactPaginate from "react-paginate";
import "../styles/pag-test.css";

const items = Array.from({ length: 1000 }).map((_, index) => index);

const Test = () => {
  // const [itemOffset, setItemOffset] = useState(0);
  // const [itemsPerPage, setItemsPerPage] = useState(5);

  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // const handlePageClick = (event) => {
  //   console.log(typeof event.selected);
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   setItemOffset(newOffset);
  // };

  const changePage = (event) => {
    console.log(event.selected);
  };

  return (
    <DashboardLayout>
      <div style={{ paddingLeft: "100px" }}>
        {/* {items &&
          items.map((item) => (
            <div key={item}>
              <h3>Item #{item}</h3>
            </div>
          ))} */}

        <div className="pag-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={changePage}
            pageCount={50}
            pageRangeDisplayed={2}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Test;
