import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import VendorsCard from "../components/VendorsCard";

import searchSvg from "../assets/employees/search.svg";
import filterSvg from "../assets/filter.svg";
import listSortSvg from "../assets/list-sort.svg";

// css
import "../styles/vendors.css";
import SearchSvg from "../components/svgs/SearchSvg";
import { AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import "../styles/vendors-modal.css";
import CarActive from "../components/svgs/CarActive";
import CarDisabled from "../components/svgs/CarDisabled";

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
    <DashboardLayout>
      <section className="vendors">
        <header className="vendors-header">
          {/* 1 */}
          <div className="vendors-switch-container">
            <p>My Vendors</p>
            <div className="toggle-switch">
              <input
                className="toggle-input"
                checked={isChecked}
                onChange={() => setISChecked(!isChecked)}
                id="toggle"
                type="checkbox"
              />
              <label className="toggle-label" htmlFor="toggle"></label>
            </div>
            <p>All Vendors</p>
          </div>
          <div>
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </div>
        </header>

        <div className="vendors-card-container">
          <AnimatePresence>
            {vendorArr
              .filter((num) => (isChecked ? true : num === 1))
              .map((num, index) => {
                return num === 1 ? (
                  <VendorsCard
                    openModal={openModal}
                    key={index}
                    index={index}
                    variant="active"
                  />
                ) : (
                  <VendorsCard
                    openModal={openModal}
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
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>&rarr;</button>

          <div className="employees-page-info">
            <p>1-5 of 5</p>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={closeModal}
          className="employees-modal vendors-modal"
          overlayClassName="employees-modal-overlay"
          closeTimeoutMS={300}
        >
          <header>
            <CarDisabled />
            <div>
              <p>KANT</p>
              <small>30333244332</small>
            </div>
          </header>
          <p className="vendors-modal-p">
            Lets connect and make communication easier!
          </p>

          <footer>
            <button className="btn btn-success">Send Request</button>
          </footer>
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default Vendors;
