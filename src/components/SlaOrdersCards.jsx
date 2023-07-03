import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

const SlaOrdersCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
    
  }


  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {  orderDate,  vendor, shop, orderNumber, slaByQuantity,slaByAmount, inTimeOrders } = row;
          return (
            <article onClick={() => {
            }} key={index} className="table-card sla-orders-card">
              <header className="table-card-row">
                <h3>
                  <span style={{color: "#6E0FF5"}}>მომწოდებელი 1</span>
                  <span className="date" >{orderDate}</span>
                </h3>
                <div className="box">
                    <span>Order #: {orderNumber}</span>
                    <span>Shop: {shop} </span>
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

export default SlaOrdersCards;
