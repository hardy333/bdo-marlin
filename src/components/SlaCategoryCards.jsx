import React from "react";
import "../styles/order-details-card.css";
import SlaQuantitySvg from "./svgs/SlaQuantitySvg";
import SlaAmountSvg from "./svgs/SlaAmountSvg";
import SlaOrdersSvg from "./svgs/SlaOrdersSvg";

const SlaCategoryCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {
            productCategory,
            orderedQuantity,
            orderedAmount,
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
                  <span style={{ color: "#6E0FF5" }}>{productCategory} </span>
                  {/* <span className="date" >{orderDate}</span> */}
                </h3>
                <div className="box">
                  <span>
                    Order Amount:
                    <span className="font-normal ml-2">
                      {orderedAmount} GEL
                    </span>
                  </span>
                  <span>
                    Order Quantity:
                    <span className="font-normal ml-2">{orderedQuantity}</span>
                  </span>
                </div>
              </header>

              {/* ------------------------------------- */}
              <div className="table-card-row">
                <span className="label">
                  <SlaQuantitySvg />
                  SL by quantity
                </span>
                <span>{slaByQuantity} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">
                  <SlaAmountSvg />
                  SL by amount
                </span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">
                  <SlaOrdersSvg />
                  In time orders
                </span>
                <span>{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default SlaCategoryCards;
