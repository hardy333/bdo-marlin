import React from "react";
import "../styles/discount-card.css";

const DiscountCard = () => {
  return (
    <article className="discount-card">
      <h2>Snacks -10%</h2>
      <h3>Document #23120</h3>

      <h4>Access:</h4>
      <p className="from-till">
        <span>From: </span> 1/02/2023
      </p>
      <p className="from-till">
        <span>Till:</span> 10/02/2023
      </p>

      <button className="btn btn-success">View Products</button>
    </article>
  );
};

export default DiscountCard;
