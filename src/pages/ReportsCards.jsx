import React from "react";
import "../styles/order-details-card.css";
import { useNavigate } from "react-router-dom";
import SlaQuantitySvg from "../components/svgs/SlaQuantitySvg";
import SlaAmountSvg from "../components/svgs/SlaAmountSvg";
import SlaOrdersSvg from "../components/svgs/SlaOrdersSvg";

const ReportsCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  const navigate = useNavigate();

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {
            orders,
            vendor,
            amount,
            slaByQuantity,
            slaByAmount,
            inTimeOrders,
          } = row;
          return (
            <article
              onClick={() => {
                navigate("/sla-by-orders");
              }}
              key={index}
              className="table-card reports-card sla-card"
            >
              <header className="table-card-row">
                <h3>
                  <span style={{ color: "#6E0FF5" }}>{vendor}</span>
                </h3>
                <div className="box">
                  <span>
                    შეკვეთები:
                    <span className="font-normal ml-2">{orders}</span>
                  </span>
                  <span>
                    თანხა:
                    <span className="font-normal ml-2">{amount} GEL</span>
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
                  {" "}
                  <SlaAmountSvg /> SL by amount
                </span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">
                  {" "}
                  <SlaOrdersSvg /> In time orders
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

export default ReportsCards;
