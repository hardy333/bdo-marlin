import React, { useState } from "react";
import VendorsCard from "./VendorsCard";

// css
import "../../styles/vendors.css";
import SearchSvg from "../../components/svgs/SearchSvg";
import { AnimatePresence } from "framer-motion";
import "../../styles/vendors-modal.css";
import "../../styles/employees.css";

import VendorsModal from "../../components/VendorsModal";
import { useQuery } from "react-query";
import { fetchData } from "../../utils/fetchData";

const vendorsUrl = "https://api.marlin.ge/api/Accounts"


const Vendors = () => {
  const [isChecked, setISChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { isLoading: vendorsIsLoading, error: vendorsError, data: vendorsData} = useQuery("vendors-cards", () => fetchData(vendorsUrl));

  

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
            {/* {vendorsData
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
              })} */}

              {
                vendorsData?.data.filter(vendorObj => vendorObj.supplier).map((vendorObj, index) => {
                  return   <VendorsCard
                  openModal={openModal}
                  vendorName={vendorObj.name}
                  key={index}
                  index={index}
                  variant="active"
                    

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

export default Vendors;
