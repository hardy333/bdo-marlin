import React from "react";

import classNames from "classnames";
import CarDisabled from "../../components/svgs/CarDisabled";
import CarActive from "../../components/svgs/CarActive";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import { motion } from "framer-motion";
import VendorsCalendarSvg from "../../components/svgs/VendorsCalendarSvg";
import VendorsCatalogueSvg from "../../components/svgs/VendorsCatalogueSvg";
import VendorsShopSvg from "../../components/svgs/VendorsShopSvg";
import { useNavigate } from "react-router-dom";

const VendorVendorsCard = ({
  variant = "disabled",
  index,
  openModal,
  vendorName,
  productsCount
}) => {
  const navigate = useNavigate();

  const footerActive = (
    <div className="vendor-card-footer">
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="შეკვეთები"
      >
        <button
          className="vendor-card__btn"
          onClick={() => {
          const urlParams = new URLSearchParams();
            urlParams.append("vendor", vendorName);


            // navigate(`/vendor-all-orders-vendor?` + urlParams.toString());
            navigate(`/vendor-all-orders?` + urlParams.toString());

          }}
        >
          {/* <img src={shoppingBag} alt="" /> */}
          <VendorsShopSvg />
        </button>
      </Tippy>
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="კატალოგი"
      >
        <button
          className="vendor-card__btn"
          onClick={() => {
            const urlParams = new URLSearchParams();
            urlParams.append("vendor", vendorName);

            navigate("/vendor-catalogue?"+ urlParams.toString());
          }}
        >
          {/* <img src={catalogue} alt="" /> */}
          <VendorsCatalogueSvg />
        </button>
      </Tippy>

      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="კალენდარი"
      >
        <button
          className="vendor-card__btn"
          onClick={() => {
            const urlParams = new URLSearchParams();
            urlParams.append("vendor", vendorName);

            navigate("/calendar-table-for-vendor?"+ urlParams.toString());
          }}
        >
          {/* <img src={calendar} alt="" /> */}
          <VendorsCalendarSvg />
        </button>
      </Tippy>
    </div>
  );

  const footerDisabled = (
    <div className="vendor-card-footer vendor-card-footer--disabled">
      <button onClick={openModal} className="btn btn-purple ">
        მოითხოვე ინტეგრაცია
      </button>
      {/* <button className="btn btn-link">View Catalogue</button> */}
      <Tippy
        className="tooltip-1"
        arrow={false}
        placement="bottom"
        content="კატალოგი"
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
      exit={{
        opacity: 0,
        y: 0,
        transition: {
          duration: 0.6,
        },
      }}
      className={classNames({
        "vendor-card": true,
        active: variant === "active",
        disabled: variant === "disabled",
      })}
    >
      <div className="vendor-card-top">
        {variant === "disabled" ? <CarDisabled /> : <CarActive />}
        <div className="vendor-card-name">
          <h3>{vendorName}</h3>
        </div>
      </div>
      <p className="vendor-card-products">
        {productsCount} პროდუქტი
      </p>
      <div className="vendor-card-bottom">
        {variant === "disabled" ? footerDisabled : footerActive}
      </div>
    </motion.article>
  );
};

export default VendorVendorsCard;
