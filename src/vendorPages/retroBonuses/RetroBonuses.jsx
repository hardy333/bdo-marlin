import React, { useEffect, useState } from "react";
import SearchSvg from "../../components/svgs/SearchSvg";
import "../../styles/discounts-cards.css";

import Select from "react-select";
import DatePickerInput from "../../components/DatePickerInput";

import { useQuery } from "react-query";
import { fetchData } from "../../utils/fetchData";
import { useAuthContext } from "../../hooks/useAuthContext";
import VendorDiscountCard from "../../components/VendorDiscountCard";

// R00001 უნდა განისაზღვროს დალოგინების დროს. 
// D00001 განისაზღვრება სელექთ მენიუს დახმარებით. 



const RetroBonuses = () => {
  const [isChecked, setISChecked] = useState(false);
  const [selectedVendor,setSelectedVendor ] = useState(null)
  const {user} = useAuthContext()


  const url = `https://api.marlin.ge/api/RBFront/${selectedVendor?.accountID}/${user.decodedToken.AccountID}`;
  const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront"

  const { isLoading, error, data } = useQuery({queryKey: ["vendor-retro-bonus-cards-data",  selectedVendor?.accountID], queryFn: () => fetchData(url), enabled: Boolean(selectedVendor?.accountID)});
  const { isLoading: vendorsIsLoading, error: vendorsError, data: vendorsData} = useQuery({queryKey: ["retailers"], queryFn: () => fetchData(vendorsUrl)});

  const vendors = vendorsData?.data.filter(account => account.isRetail).map(acc => ({value: acc.name, label: acc.name, accountID: acc.accountID }))

  

  useEffect(() => {
    if(!vendors || !vendorsData) return
    if(selectedVendor) return
    setSelectedVendor(vendors[0])

  },[vendorsData])

  const handleVendorChange = (x) => {
    setSelectedVendor(x)
  }
  
  console.log(selectedVendor)
  console.log(data)

  
  
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
                <VendorDiscountCard
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

export default RetroBonuses;
