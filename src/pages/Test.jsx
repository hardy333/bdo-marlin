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

export const parentCategories = [
  "Chips",
  "Nacho",
  "Tortia",
  "sunflower Seeds",
  "Popcorn",
  "Crackers",
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

  // section 3
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DashboardLayout>
      <div className="categories categories--5">
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
            <div className="section-2__list-container">
              {[
                ...parentCategories,
                ...parentCategories,
                ...parentCategories,
                ...parentCategories,
              ].map((parentCat, i) => {
                return (
                  <ul key={i}>
                    <li className="parent-li">{parentCat}</li>
                    {Array.from({
                      length: Math.floor(Math.random() * 5 + 7),
                    }).map((_, index) => {
                      const item =
                        items1[Math.floor(Math.random() * items1.length)];
                      return (
                        <li
                          key={index}
                          onClick={(e) => {
                            setSelectedItem(item);
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          </div>

          <section
            className={classNames({
              "section-2": true,
              "section-3 open": true,
              open: selectedItem,
            })}
          >
            <header>
              <div className="input-wrapper">
                <input type="text" className="input" />
                <SearchSvg />
              </div>
            </header>

            <div className={`section-2__container `}>
              <ul className="section-3__list">
                {items1.map((item, index) => (
                  <li key={index} onClick={() => setIsHover(false)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Test;
