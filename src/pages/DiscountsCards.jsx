import React, { useEffect, useState } from "react";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/discounts-cards.css";

import Select from "react-select";
import DiscountCard from "../components/DiscountCard";
import DatePickerInput from "../components/DatePickerInput";

import { useQuery } from "react-query";
import { fetchData } from "../utils/fetchData";
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressBar from "../components/ProgressBar";

// R00001 უნდა განისაზღვროს დალოგინების დროს.
// D00001 განისაზღვრება სელექთ მენიუს დახმარებით.

const DiscountsCards = () => {
  const [isChecked, setISChecked] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { user } = useAuthContext();

  const oldUrl = `https://10.0.0.202:5001/api/RBFront/${user.decodedToken.AccountID}/${selectedVendor?.accountID}`
  const url = `https://api.marlin.ge/api/RBFront/${user.decodedToken.AccountID}/${selectedVendor?.accountID}`;
  const oldVendorsUrl = `https://10.0.0.202:5001/api/AccountDataFront`
  const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront";

  // Cards data
  // Cards data
  const {
    isLoading: bonusesIsLoading,
    error: bonusesError,
    isError: isBonusesError,
    isFetching: bonusesIsFetching,
    data,
    refetch,
    isPlaceholderData,
    isRefetching,
    isPreviousData,
    ...x
  } = useQuery({
    queryKey: [
      `${user.decodedToken.AccountID}-r-retro-bonus-cards-data-for-retailers`,
      selectedVendor?.accountID,
    ],
    queryFn: () => fetchData(url),
    enabled: Boolean(selectedVendor?.accountID),
    onError: (err) => {
    },
    onSuccess: (x) => {
    },
    select: (data) => {

      
      return data.data.data
      
    },
    retry: 1,
    keepPreviousData: true
  });

  // console.log(x)

  console.log({  isPreviousData})


  // Accounts data
  // Accounts data
  const {
    isLoading: vendorsIsLoading,
    error: vendorsError,
    isError: isVendorsError,
    data: vendorsData,
  } = useQuery({
    queryKey: ["r-vendors"],
    queryFn: () => fetchData(vendorsUrl),
    onError: (err) => {
    },
    onSuccess: (x) => {
    },
    select: (data) => {
      console.log("acc", data)

      return data.data.data.map(acc => ({...acc, isVendor: acc.isVendor, isRetail: acc.isRetail}))
    },
    retry: 1,
  });


  const vendors = vendorsData?.filter((account) => account.isVendor)
    .map((acc) => ({
      value: acc.name,
      label: acc.name,
      accountID: acc.accountID,
    }));

  useEffect(() => {
    if (!vendors || !vendorsData) return;
    if (selectedVendor) return;
    setSelectedVendor(vendors[1] || vendors[0]);
  }, [vendorsData]);

  const handleVendorChange = (x) => {
    setSelectedVendor(x);
  };


  return (
    <>
      <section className="discounts" style={{position: "relative"}}>
        <ProgressBar  show={isPreviousData}/>
        <header className="discounts-header" >


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
        {isVendorsError ? (
          <p style={{ paddingTop: "100px", textAlign: "center"}}>
             მომწოდებლების ჩატვირთვა ვერ მოხდა, გთხოვ სცადეთ მოგვიანებით.
             <span onClick={() => window.location.reload()} style={{display: "block", color: "var(--color-primary-4)", cursor: "pointer"}}>ან ჩატვირთეთ აპლიკაცია თავიდან.</span>
          </p>
        ) : null}
        {isBonusesError ? (
          <p style={{ paddingTop: "100px", textAlign: "center"}}>
             ბონუსების ჩატვირთვა ვერ მოხდა, გთხოვ სცადეთ მოგვიანებით.
          </p>
        ) : null}

        <div className="discount-cards-container" style={{opacity: isPreviousData ? 0.6: 1}}>
          {data?.map((obj, index) => {
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
