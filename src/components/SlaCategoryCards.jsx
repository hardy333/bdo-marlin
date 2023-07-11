import React from "react";
import "../styles/order-details-card.css";

const SlaCategoryCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
    
  }


  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {  orderedAmount,  productCategory, orderedQuantity, orderNumber, slaByQuantity,slaByAmount, inTimeOrders } = row;
          return (
            <article onClick={() => {
            }} key={index} className="table-card sla-orders-card">
              <header className="table-card-row">
                <h3>
                  <span style={{color: "#6E0FF5"}}>{productCategory}</span>
                </h3>
                <div className="box">
                    <span className="text-right">შეკვეთილი რაოდენობა: <span className="font-normal inline-block ms-auto text-right">{orderedQuantity}</span>  </span>
                    <span className="text-right">შეკვეთილი თანხა:  <span className="font-normal inline-block ms-auto text-right">{orderedAmount}</span>  </span>
                </div>
              </header>

              {/* ------------------------------------- */}
              <div className="table-card-row">
                <span className="label">SL by quantity</span>
                <span>{slaByQuantity} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">SL by amount</span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span className="label">In time orders</span>
                <span >{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default SlaCategoryCards;
