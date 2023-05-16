import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import SearchSvg from "../components/svgs/SearchSvg";
import VendorsCard from "../components/VendorsCard";
import "../styles/discounts-cards.css";

import Select from "react-select";
import PlusSvg from "../components/svgs/PlusSvg";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";
import DiscountCard from "../components/DiscountCard";

const options = [
  { value: "Orbita", label: "Orbita" },
  { value: "Kant", label: "Kant" },
  { value: "Ready Meals", label: "Ready Meals" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Orbita5", label: "Orbita5" },
  { value: "Magako", label: "Magako" },
  { value: "Vest Inv", label: "Vest Inv." },
  { value: "Svaneti", label: "Svaneti" },
  { value: "Orbita1", label: "Orbita1" },
  { value: "Ready Meals1", label: "Ready Meals1" },
  { value: "Orbita2", label: "Orbita2" },
  { value: "Diplomat1", label: "Diplomat1" },
  { value: "Orbita3", label: "Orbita3" },
  { value: "Vest Inv1", label: "Vest Inv1." },
  { value: "Orbita4", label: "Orbita4" },
  { value: "Orbita6", label: "Orbita6" },
  { value: "Kant1", label: "Kant1" },
  { value: "Orbita7", label: "Orbita7" },
  { value: "Magako1", label: "Magako1" },
  { value: "Svaneti1", label: "Svaneti1" },
];

const DiscountsCards = () => {
  const [vendorArr, setVendorArr] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);

  const [isChecked, setISChecked] = useState(false);

  return (
    <DashboardLayout>
      <section className="discounts">
        <header className="discounts-header">
          {/* 1 */}
          <h1>Discounts</h1>

          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            defaultValue={{ value: "GDM", label: "GDM" }}
          />
          <button className="btn btn-outlined btn-black ">
            <PlusSvg fill="#211543" />
            Add
          </button>
          <button className="all-orders__btn excel-export-btn">
            <ExcelExportSvg />
          </button>
        </header>

        <div className="discount-cards-container">
          {vendorArr
            .filter((num) => (isChecked ? true : num === 1 || num === 0))
            .map((num, index) => {
              return <DiscountCard />;
            })}
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
      </section>
    </DashboardLayout>
  );
};

export default DiscountsCards;
