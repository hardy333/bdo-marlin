import React from "react";
import "../styles/order-details-card.css";

const SlaShopsCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
    
  }


  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {  orderDate, shop,  deliveredQuantity, orders, slaByQuantity,slaByAmount, inTimeOrders } = row;
          return (
            <article onClick={() => {
            }} key={index} className="table-card sla-orders-card">
              <header className="table-card-row">
                <h3>
                  <span style={{color: "#6E0FF5"}}>{orderDate}</span>
                  <span className="date" >{shop}</span>
                </h3>
                <div className="box">
                    <span >Orders: <span className="font-normal">{orders}</span> </span>
                    <span >Delivered: <span className="font-normal text-success">{deliveredQuantity} </span> </span>
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
                <span className="text-primary">{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default SlaShopsCards;
