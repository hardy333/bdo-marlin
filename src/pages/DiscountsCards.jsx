import React, { useState } from "react";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/discounts-cards.css";

import Select from "react-select";
import DiscountCard from "../components/DiscountCard";
import DatePickerInput from "../components/DatePickerInput";
import { AnimatePresence } from "framer-motion";

import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from "@uidotdev/usehooks";

const options = [
  { value: "მომწოდებელი 1", label: "მომწოდებელი 1" },
  { value: "მომწოდებელი 2", label: "მომწოდებელი 2" },
  { value: "მომწოდებელი 3 ", label: "მომწოდებელი 3 " },
  { value: "მომწოდებელი 4", label: "მომწოდებელი 4" },
  { value: "მომწოდებელი 5", label: "მომწოდებელი 5" },
  { value: "მომწოდებელი 6", label: "მომწოდებელი 6" },
  { value: "მომწოდებელი 7 ", label: "მომწოდებელი 7" },
  { value: "მომწოდებელი 8", label: "მომწოდებელი 8" },
  { value: "მომწოდებელი 9", label: "მომწოდებელი 9" },
  { value: "მომწოდებელი 10", label: "მომწოდებელი 10 " },
  { value: "მომწოდებელი 11", label: "მომწოდებელი 11" },
  { value: "მომწოდებელი 12", label: "მომწოდებელი 12" },
  { value: "მომწოდებელი 13", label: "მომწოდებელი 13" },
  { value: "მომწოდებელი 14", label: "მომწოდებელი 14" },
  { value: "მომწოდებელი 15", label: "მომწოდებელი 15" },
  { value: "მომწოდებელი 16", label: "მომწოდებელი 16" },
  { value: "მომწოდებელი 17", label: "მომწოდებელი 17" },
  { value: "მომწოდებელი 18", label: "მომწოდებელი 18" },
  { value: "მომწოდებელი 19", label: "მომწოდებელი 19" },
  { value: "მომწოდებელი 20", label: "მომწოდებელი 20" },
];

const products = [
  { dis: 25, name: "კონსერვი", id: uuidv4() },
  { dis: 45, name: "ფქვილი", id: uuidv4() },
  { dis: 20, name: "კვერცხი", id: uuidv4() },
  { dis: 10, name: "ლიმონი", id: uuidv4() },
  { dis: 30, name: "ბანანი", id: uuidv4() },
  { dis: 30, name: "ბანანი", id: uuidv4() },
  { dis: 20, name: "კივი", id: uuidv4() },
  { dis: 10, name: "შოკოლადი", id: uuidv4() },
  { dis: 10, name: "შოკოლადი", id: uuidv4() },
  { dis: 5, name: "სათამაშოები", id: uuidv4() },
  { dis: 5, name: "სათამაშოები", id: uuidv4() },
  { dis: 5, name: "სათამაშოები", id: uuidv4() },
  { dis: 30, name: " ჯაგრისი", id: uuidv4() },
  { dis: 15, name: "ვანილი", id: uuidv4() },
  { dis: 15, name: "ვანილი", id: uuidv4() },
  { dis: 15, name: "ვანილი", id: uuidv4() },
  { dis: 20, name: "კოქტეილები", id: uuidv4() },
  { dis: 20, name: "კოქტეილები", id: uuidv4() },
  { dis: 50, name: "ბლითი", id: uuidv4() },
  { dis: 10, name: "ზეთისხილი", id: uuidv4() },
  { dis: 10, name: "ზეთისხილი", id: uuidv4() },
  { dis: 10, name: "ძეხვი", id: uuidv4() },
  { dis: 35, name: "არაჟანი", id: uuidv4() },
  { dis: 35, name: "არაჟანი", id: uuidv4() },
  { dis: 10, name: "ზეთი", id: uuidv4() },
  { dis: 10, name: "ზეთი", id: uuidv4() },
  { dis: 50, name: "ნაყინი", id: uuidv4() },
  { dis: 50, name: "ნაყინი", id: uuidv4() },
];

const products2 = products
  .map((prod) => ({ ...prod, dis: prod.dis + 5, id: uuidv4() }))
  .sort(() => Math.random() - 0.5);

const DiscountsCards = () => {
  const [isChecked, setISChecked] = useState(false);

  let cards
  if(isChecked){
    cards = products2
  }else{
    cards = products
  }
  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");

  
  return (
    <>
      <section className="discounts">
        <header className="discounts-header">
          {/* 1 */}
          <h1>რეტრო ბონუსები</h1>

          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            defaultValue={{ value: "მომწოდებელი 1", label: "მომწოდებელი 1" }}
          />
          {/* <div className="vendors-switch-container ml-10">
            <p className="">{isSmallDevice ? "ბონუსები" : "რეტრო ბონუსები"}</p>
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
            <p className="">ფასდაკლებები</p>
          </div> */}

          <DatePickerInput />
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </header>

        <div className="discount-cards-container">
          <AnimatePresence mode="wait" initial={false}>
            {cards.map((obj, index) => {
              return (
                <DiscountCard
                  name={obj.name}
                  dis={obj.dis}
                  index={index}
                  key={obj.id}
                  isBonusCard={isChecked === false}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <div className="employee-pag-container">
          <button>&larr;</button>
          <button className="active">1</button>
          <button>&rarr;</button>

          <div className="employees-page-info">
            <p>
              1-{products.length} of {products.length}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountsCards;
