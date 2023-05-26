import React from "react";
import "../styles/discount-card.css";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";
import ayeeSvg from "../assets/ayee.png";
import EyeSvg from "./svgs/EyeSvg";
import NewSvg from "./svgs/NewSvg";

const DiscountCard = () => {
  return (
    <article className="discount-card">
      <h2>Snacks -10%</h2>
      <h3>Document #23120</h3>
      {Math.random() - 0.5 > 0 ? (
        <div className="discount-card__ayee-img">
          <EyeSvg />
        </div>
      ) : (
        <div className="discount-card__new-img">
          <NewSvg />
        </div>
      )}

      <div className="discount-card__body">
        <h4>
          <VendorsCalendarSvg />
          Valid Period
        </h4>
        <p>1/02/2023 - 10/02/2023</p>
      </div>

      <button className="btn btn-success">View Products</button>
    </article>
  );
};

export default DiscountCard;
