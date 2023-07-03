import React from "react";
import "../styles/order-details-card.css";

const OrderDetailsCards = ({ data, date, status, statusBg, vendor }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <section className="table-cards-container">
        {data.map((row) => {
          const {
            barcode,
            quantity,
            product,
            reservedQuantity,
            price,
            amount,
          } = row;
          return (
            <article className="table-card order-details-card">
              <header className="table-card-row">
                <h3>
                  <span>{vendor}</span>
                  <small> {date}</small>
                </h3>
                <span className="status" style={{ color: statusBg }}>
                  {status}
                </span>
              </header>
              <div className="table-card-row">
                <span>Barcode</span>
                <span>{barcode}</span>
              </div>
              <div className="table-card-row">
                <span>Product</span>
                <span>{product}</span>
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
