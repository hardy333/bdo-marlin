import React from "react";

import carOrange from "../assets/car-orange.svg";
import carPurple from "../assets/car-purple.svg";
import classNames from "classnames";
import CarDisabled from "./svgs/CarDisabled";
import CarActive from "./svgs/CarActive";
import shoppingBag from "../assets/shopping-bag.svg";
import catalogue from "../assets/catalogue.svg";
import calendar from "../assets/calendar.svg";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import { motion } from "framer-motion";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";
import VendorsCatalogueSvg from "./svgs/VendorsCatalogueSvg";
import VendorsShopSvg from "./svgs/VendorsShopSvg";

const VendorsCard = ({ variant = "disabled", index, openModal }) => {
  const footerActive = (
    <div className="vendor-card-footer">
      {/* <button className="btn btn-link">View Calendar</button>
      <div className="vendor-card-hr"></div>
      <button className="btn btn-link">View Catalogue</button> */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="Shop"
      >
        <button className="vendor-card__btn">
          {/* <img src={shoppingBag} alt="" /> */}
          <VendorsShopSvg />
        </button>
      </Tippy>
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="Catalogue"
      >
        <button className="vendor-card__btn">
          {/* <img src={catalogue} alt="" /> */}
          <VendorsCatalogueSvg />
        </button>
      </Tippy>

      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="Calendar"
      >
        <button className="vendor-card__btn">
          {/* <img src={calendar} alt="" /> */}
          <VendorsCalendarSvg />
        </button>
      </Tippy>
    </div>
  );

  const footerDisabled = (
    <div className="vendor-card-footer vendor-card-footer--disabled">
      <button onClick={openModal} className="btn btn-purple ">
        Send request
      </button>
      {/* <button className="btn btn-link">View Catalogue</button> */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="Catalogue"
      >
        <button>
          {/* <img src={catalogue} alt="" /> */}
          <VendorsCatalogueSvg />
        </button>
      </Tippy>
    </div>
  );

  return (
    <motion.article
      custom={index - 8}
      initial={{ opacity: 0, y: 50 }}
      animate={(i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05,
        },
      })}
      exit={(i) => ({
        opacity: 0,
        y: 0,
        transition: {
          // delay: i * 0.05,
          duration: 0.6,
        },
      })}
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
    </motion.article>
  );
};

export default VendorsCard;
