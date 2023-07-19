import React, { useState } from "react";
import VendorsCard from "./VendorsCard";

// css
import "../../styles/vendors.css";
import SearchSvg from "../../components/svgs/SearchSvg";
import { AnimatePresence } from "framer-motion";
import "../../styles/vendors-modal.css";
import "../../styles/employees.css";

import VendorsModal from "../../components/VendorsModal";

import { vendorsData } from "./vendorsData";

const Vendors = () => {
  const [vendorArr, setVendorArr] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);

  const [isChecked, setISChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log("Open modal");
    setIsOpen(true);
  }

  return (
    <>
      <section className="vendors">
        <header className="vendors-header justify-start">
          {/* 1 */}
          <h4 className="text-[18px] font-semibold me-10">მომწოდებლები</h4>
          <div className="vendors-switch-container ">
            <p className="font-normal text-[14px]">ჩემი ვენდორები</p>
            <div className="toggle-switch me-auto">
              <input
                className="toggle-input"
                checked={isChecked}
                onChange={() => setISChecked(!isChecked)}
                id="toggle"
                type="checkbox"
              />
              <label className="toggle-label" htmlFor="toggle"></label>
            </div>
            <p  className="font-normal text-[14px]">ყველა ვენდორი</p>
          </div>
          <div className="ms-auto">
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </div>
        </header>

        <div className="vendors-card-container">
          <AnimatePresence initial={false}>
            {vendorsData
              .filter((vendorObj) =>
                isChecked ? true : vendorObj.status === "active"
              )
              .map((vendorObj, index) => {
                return vendorObj.status === "active" ? (
                  <VendorsCard
                    openModal={openModal}
                    key={index}
                    index={index}
                    variant="active"
                    vendorName={vendorObj.name}
                  />
                ) : (
                  <VendorsCard
                    openModal={openModal}
                    vendorName={vendorObj.name}
                    key={index}
                    index={index}
                  />
                );
              })}
          </AnimatePresence>
        </div>
        <div className="employee-pag-container">
          <button>&larr;</button>
          <button className="active">1</button>
          {/* <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button> */}
          <button>&rarr;</button>

          <div className="employees-page-info">
            <p>
              1-
              {
                vendorArr.filter((num) => (isChecked ? true : num === 1)).length
              }{" "}
              of{" "}
              {vendorArr.filter((num) => (isChecked ? true : num === 1)).length}
            </p>
          </div>
        </div>

        <VendorsModal
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        />
      </section>
    </>
  );
};

export default Vendors;
