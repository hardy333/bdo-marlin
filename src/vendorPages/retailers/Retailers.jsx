import React, { useState } from "react";
import VendorsCard from "../../pages/vendors/VendorsCard";

// css
import "../../styles/vendors.css";
import SearchSvg from "../../components/svgs/SearchSvg";
import { AnimatePresence } from "framer-motion";
import "../../styles/vendors-modal.css";
import "../../styles/employees.css";

import VendorsModal from "../../components/VendorsModal";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/fetchData";

const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront"


const Retailers = () => {
  const [isChecked, setISChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { isLoading: vendorsIsLoading, error: vendorsError, data: retailersData} = useQuery("retailer-cards", () => fetchData(vendorsUrl));

  

  return (
    <>
      <section className="vendors">
        <header className="vendors-header justify-start">
          {/* 1 */}
          <div className="vendors-switch-container ">
            <p className="font-normal text-[14px]">ჩემი რითეილერები</p>
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
            <p  className="font-normal text-[14px]">ყველა რითეილერი</p>
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
              {
                retailersData?.data.filter(vendorObj => !vendorObj.supplier ).map((vendorObj, index) => {
                  return   <VendorsCard
                  openModal={openModal}
                  vendorName={vendorObj.name}
                  key={index}
                  index={index}
                  variant="active"
                  productsCount={vendorObj.productsCount}
                />
                })
              }
          </AnimatePresence>
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

export default Retailers;
