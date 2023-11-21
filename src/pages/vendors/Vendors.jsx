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
import ProgressBar from "../../components/ProgressBar";

const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront";

const Vendors = () => {
  const [isChecked, setISChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    isLoading: vendorsIsLoading,
    isError: isVendorsError,
    error: vendorsError,
    data: vendorsData,
  } = useQuery({
    queryKey: "r-vendors-cards",
    queryFn: () => fetchData(vendorsUrl),
    onSuccess: () => {

    },
    onError: (err) => {
      console.log({err})

    },
    select: (data) => {
      return data.data
    },
    retry: 1
  });

  console.log({vendorsError});

  return (
    <>
      <section className="vendors">
        <header className="vendors-header justify-start" style={{position: "relative"}}>
        <ProgressBar show={vendorsIsLoading} />

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
            <p className="font-normal text-[14px]">ყველა ვენდორი</p>
          </div>
          <div className="ms-auto">
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </div>
        </header>
        { isVendorsError? (
          <p style={{ paddingTop: "100px", textAlign: "center"}}>
             მონაცემების ჩატვირთვა ვერ მოხდა, გთხოვ სცადეთ მოგვიანებით.
             <span className="error-load-page-link" onClick={() => window.location.reload()} style={{display: "block", color: "var(--color-primary-4)", cursor: "pointer"}}>ან ჩატვირთეთ აპლიკაცია თავიდან.</span>
          </p>
        ) : null}

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

            {vendorsData?.data
              .filter((vendorObj) => vendorObj.isVendor)
              .map((vendorObj, index) => {
                return (
                  <VendorsCard
                    openModal={openModal}
                    vendorName={vendorObj.name}
                    key={index}
                    index={index}
                    variant="active"
                    productsCount={vendorObj.productsCount}
                  />
                );
              })}
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
