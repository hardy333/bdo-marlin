import React, { useState } from "react";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/discounts-cards.css";

import Select from "react-select";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";
import DiscountCard from "../components/DiscountCard";

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
  {dis: 25, name: "კონსერვი",},
{dis: 45, name: "ფქვილი",},
{dis: 20, name: "კვერცხი",},
{dis: 10, name: "ლიმონი",},
{dis: 30, name: "ბანანი",},
{dis: 20, name: "კივი"},
{dis: 10, name: "შოკოლადი"},
{dis: 5, name: "სათამაშოები",},
{dis: 30, name: " ჯაგრისი"},
{dis: 15, name: "ვანილი",},
{dis: 20, name: "კოქტეილები",},
{dis: 50, name: "ბლითი",},
{dis: 10, name: "ზეთისხილი",},
{dis: 10, name: "ძეხვი",},
{dis: 35, name: "არაჟანი",},
{dis: 10, name: "ზეთი",},
{dis: 50, name: "ნაყინი"},
]

const DiscountsCards = () => {
  const [isChecked, setISChecked] = useState(false);

  return (
    <>
      <section className="discounts">
        <header className="discounts-header">
          {/* 1 */}
          <h1>ფასდაკლება</h1>

          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            defaultValue={{ value: "მომწოდებელი 1", label: "მომწოდებელი 1" }}
          />
          <div className="vendors-switch-container ml-10">
            <p>აქტიური</p>
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
            <p>ყველა</p>
          </div>

          <button
            className="all-orders__btn excel-export-btn"
            style={{ marginLeft: "auto", marginRight: "30px" }}
          >
            <ExcelExportSvg />
          </button>

          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </header>

        <div className="discount-cards-container">
          {products
            .map((obj, index) => {
              return <DiscountCard key={index} name={obj.name} dis={obj.dis} index={index} />;
            })}
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
