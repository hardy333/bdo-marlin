import React from "react";
import "../styles/order-details-card.css";

const OrderDetailsCards = ({ data, date, status, statusBg, vendor }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  console.log(data)
  
  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {
            barcode,
            quantity,
            product,
            reservedQuantity,
            amount, 
            price
          } = row;
          return (
            <article key={barcode+index} className="table-card order-details-card">
              <div className="table-card-row">
                <span>Barcode</span>
                <span>{barcode}</span>
              </div>
              <div className="table-card-row">
                <span>Product</span>
                <span>{product}</span>
              </div>
              <div className="table-card-row">
                <span>Amount</span>
                <span>{amount}</span>
              </div>
              <div className="table-card-row">
                <span>Price</span>
                <span>{price}</span>
              </div>
              <div className="table-card-row">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="table-card-row">
                <span>Reserved</span>
                <span className={`danger`}>{reservedQuantity}</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default OrderDetailsCards;
