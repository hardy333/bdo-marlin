import React from "react";

import carOrange from "../assets/car-orange.svg";
import carPurple from "../assets/car-purple.svg";
import classNames from "classnames";

const VendorsCard = ({ variant = "orange" }) => {
  return (
    <article
      className={classNames({
        "vendor-card": true,
        purple: variant === "purple",
        orange: variant === "orange",
      })}
    >
      <div className="vendor-card-top">
        {variant === "orange" ? (
          <img src={carOrange} alt="" />
        ) : (
          <img src={carPurple} alt="" />
        )}
        <div className="vendor-card-name">
          <h3>GDM</h3>
          <small>207614789</small>
        </div>
      </div>
      <p className="vendor-card-products">432 Products</p>
      <div className="vendor-card-bottom">
        <button
          className="btn"
          style={{ display: variant === "orange" ? "block" : "none" }}
        >
          Send request
        </button>
        <p>View Catalogue &#62; </p>
      </div>
    </article>
  );
};

export default VendorsCard;
