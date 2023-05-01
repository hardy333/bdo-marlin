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
      <button>
        <img src={shoppingBag} alt="" />
      </button>
      <button>
        <img src={catalogue} alt="" />
      </button>
      <button>
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
