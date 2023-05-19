import React from "react";

import carOrange from "../assets/car-orange.svg";
import carPurple from "../assets/car-purple.svg";
import classNames from "classnames";
import CarDisabled from "./svgs/CarDisabled";
import CarActive from "./svgs/CarActive";
import shoppingBag from "../assets/shopping-bag.svg";
import catalogue from "../assets/catalogue.svg";
import calendar from "../assets/calendar.svg";

const VendorsCard = ({ variant = "disabled" }) => {
  const footerActive = (
    <div className="vendor-card-footer">
      {/* <button className="btn btn-link">View Calendar</button>
      <div className="vendor-card-hr"></div>
      <button className="btn btn-link">View Catalogue</button> */}
      <button className="vendor-card__btn">
        {/* <img src={shoppingBag} alt="" /> */}
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
              <use xlink:href="#image0_988_2971" transform="scale(0.015625)" />
            </pattern>
            <image
              id="image0_988_2971"
              width="64"
              height="64"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </button>
      <button className="vendor-card__btn">
        {/* <img src={catalogue} alt="" /> */}
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
      </button>
      <button className="vendor-card__btn">
        <img src={calendar} alt="" />
      </button>
    </div>
  );

  const footerDisabled = (
    <div className="vendor-card-footer vendor-card-footer--disabled">
      <button className="btn btn-purple ">Send request</button>
      {/* <button className="btn btn-link">View Catalogue</button> */}
      <button>
        <img src={catalogue} alt="" />
      </button>
    </div>
  );

  return (
    <article
      className={classNames({
        "vendor-card": true,
        active: variant === "active",
        disabled: variant === "disabled",
      })}
    >
      <div className="vendor-card-top">
        {variant === "disabled" ? <CarDisabled /> : <CarActive />}
        <div className="vendor-card-name">
          <h3>GDM</h3>
        </div>
      </div>
      <p className="vendor-card-products">432 Products</p>
      <div className="vendor-card-bottom">
        {variant === "disabled" ? footerDisabled : footerActive}
      </div>
    </article>
  );
};

export default VendorsCard;
