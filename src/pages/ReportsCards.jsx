import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

const ReportsCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
    
  }

  const navigate = useNavigate()

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {  orders, vendor, amount, slaByQuantity,slaByAmount, inTimeOrders } = row;
          return (
            <article onClick={() => {
            }} key={index} className="table-card reports-card">
              <header className="table-card-row">
                <h3>
                  <span style={{color: "#6E0FF5"}}>{vendor}</span>
                </h3>
                <div className="box">
                    <span>შეკვეთები: {orders}</span>
                    <span>თანხა: {amount} GEL</span>
                </div>
              </header>

              {/* ------------------------------------- */}
              <div className="table-card-row">
                <span>SL by quantity</span>
                <span>{slaByQuantity} %</span>
              </div>
              <div className="table-card-row">
                <span>SL by amount</span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span>In time orders</span>
                <span >{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default ReportsCards;
