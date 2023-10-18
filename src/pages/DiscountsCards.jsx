import React, { useEffect, useState } from "react";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/discounts-cards.css";

import Select from "react-select";
import DiscountCard from "../components/DiscountCard";
import DatePickerInput from "../components/DatePickerInput";

import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";


const url = "https://api.marlin.ge/api/RBFront/R00001/D00001"
const vendorsUrl = "https://api.marlin.ge/api/Accounts"


const DiscountsCards = () => {
  const [isChecked, setISChecked] = useState(false);
  const { isLoading, error, data } = useQuery("retro-bonus-cards-data", () => fetchData(url));
  const [selectedVendor,setSelectedVendor ] = useState(null)


  const { isLoading: vendorsIsLoading, error: vendorsError, data: vendorsData} = useQuery("vendors", () => fetchData(vendorsUrl));

  const vendors = vendorsData?.data.filter(account => account.supplier).map(acc => ({value: acc.name, label: acc.name }))

  

  useEffect(() => {
    if(!vendors || !vendorsData) return
    setSelectedVendor(vendors[0])

  },[vendorsData])

  const handleVendorChange = (x) => {
    setSelectedVendor(x)


  }
  

  
  
  return (
    <>
      <section className="discounts">
        <header className="discounts-header">
          {/* 1 */}
          <h1>რეტრო ბონუსები</h1>

          <Select
            onChange={handleVendorChange}
            className="react-select-container"
            classNamePrefix="react-select"
            options={vendors}
            value={selectedVendor}
            defaultValue={selectedVendor}
            defaultMenuIsOpen={false}
             
          />

          <DatePickerInput />
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </header>

        <div className="discount-cards-container">
            {data?.data.map((obj, index) => {
              return (
                <DiscountCard
                condition={obj.condition}
                planAmount={obj.planAmount}
                  key={obj.retroBonusID}
                  status={obj.status}
                  retroPercent={obj.retroPercent}
                  startDate={obj.startDate}
                  documentNo={obj.documentNo}
                  isBonusCard={isChecked === false}
                  retroBonusID={obj.retroBonusID}
                  selectedVendor={selectedVendor}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default DiscountsCards;
