import React from "react";
import "../styles/order-details-card.css";
import SlaQuantitySvg from "./svgs/SlaQuantitySvg";
import SlaAmountSvg from "./svgs/SlaAmountSvg";
import SlaOrdersSvg from "./svgs/SlaOrdersSvg";

const SlaItemsCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {
            product,
            orders,
            orderedQuantity,
            orderNumber,
            slaByQuantity,
            slaByAmount,
            inTimeOrders,
          } = row;
          return (
            <article
              onClick={() => {}}
              key={index}
              className="table-card sla-orders-card"
            >
              <header className="table-card-row">
                <h3>
                  <span
                    style={{
                      color: "#6E0FF5",
                      maxWidth: "175px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: "30px",
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product}
                  </span>
                </h3>
                <div className="box">
                  <span>შეკვეთილი რაოდენობა: <span className="font-normal">{orders}</span> </span>
                  <span>მოტანილი რაოდენობა: <span className="text-success font-normal"> {orderedQuantity} </span></span>
                </div>
              </header>

              {/* ------------------------------------- */}
              <div className="table-card-row">
                <span className="label">
                    <SlaQuantitySvg />
                    SL by quantity</span>
                <span>{slaByQuantity} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">
                    <SlaAmountSvg />
                    SL by amount</span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">
                    <SlaOrdersSvg />
                    In time orders</span>
                <span>{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default SlaItemsCards;
