import React, { useMemo, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/switch.css";
import ReactPaginate from "react-paginate";
import "../styles/pag-test.css";
import "../styles/status-component.css";
import "../styles/categories.css";
import SearchSvg from "../components/svgs/SearchSvg";
import classNames from "classnames";

export const items = Array.from({ length: 1000 }).map((_, index) => index);

export const items1 = [
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
  "Nachos",
  "Nachos",
  "Nachos",
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
];

const Test = () => {
  const [isHover, setIsHover] = useState(false);
  const [isSectionHover, setIsSectionHover] = useState(false);

  const c = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      return items1[Math.floor(Math.random() * items1.length)];
    });
  }, []);

  const disableHoverAsync = () => {
    setIsHover(false);
  };

  return (
    <DashboardLayout>
      <div className="categories">
        <section className="section-first">
          <header className="categories__header">
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </header>
          <div className="categories__list-container">
            <ul className="categories__list">
              {c.map((item, index) => (
                <li
                  key={index}
                  onMouseOut={disableHoverAsync}
                  onMouseOver={() => setIsHover(true)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="categories__footer">
            <p>View full structure </p>
          </div>
        </section>

        <section
          className={classNames({
            "section-2": true,
            open: isHover || isSectionHover,
          })}
          onMouseOut={() => setIsSectionHover(false)}
          onMouseOver={() => setIsSectionHover(true)}
        >
          <header>
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </header>
          <div className={`section-2__container ${isHover ? "open" : ""}`}>
            <ul className="section-2__list">
              {items1.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Test;
