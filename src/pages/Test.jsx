import React, { useMemo, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/switch.css";
import ReactPaginate from "react-paginate";
import "../styles/pag-test.css";
import "../styles/status-component.css";
import "../styles/categories.css";
import SearchSvg from "../components/svgs/SearchSvg";
import classNames from "classnames";
import CatalogueMenu from "../components/CatalogueMenu";
import "../styles/test.css";
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
  return (
    <>
      <div className="test-div"></div>
    </>
  );
};

export default Test;
