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
    <DashboardLayout>
      <div className="catalogue-menu-container">
        {/* <CatalogueMenu /> */}
        <p>lorem</p>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect width="18" height="18" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image0_988_2969" transform="scale(0.015625)" />
            </pattern>
            <image
              id="image0_988_2969"
              width="64"
              height="64"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <p>lorem</p>
      </div>
    </DashboardLayout>
  );
};

export default Test;
