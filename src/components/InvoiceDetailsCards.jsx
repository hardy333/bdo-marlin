import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";

const InvoiceDetailsCards = ({ data }) => {
  if (!data) {
    // return <h1>Loading ...</h1>;
    data = [
      {
        shop: "SPAR001",
        date: "10/02/2023",
        vendor: "GDM",
        amount: 340,
        status: "Pending",
        serviceLevel: 75,
      },
      {
        shop: "SPAR001",
        date: "10/02/2023",
        vendor: "GDM",
        amount: 340,
        status: "Pending",
        serviceLevel: 75,
      },
      {
        shop: "SPAR001",
        date: "10/02/2023",
        vendor: "GDM",
        amount: 340,
        status: "Pending",
        serviceLevel: 75,
      },
      {
        shop: "SPAR001",
        date: "10/02/2023",
        vendor: "GDM",
        amount: 340,
        status: "Pending",
        serviceLevel: 75,
      },
    ];
  }




  
  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {

          const { product, orderAmount, invoiceAmount, invoiceQuantity, orderQuantity} = row;
          
          
          return (
            <article
              key={index}
              className="table-card all-orders-card"
              style={{ borderLeft: `1px solid  ` }}
            >
              <div className="table-card-row">
                <span>პროდუქტი</span>
                <span>{product}</span>
              </div>
              <div className="table-card-row">
                <span>შეკვეთის თანხა</span>
                <span>{orderAmount} GEL</span>
              </div>
              <div className="table-card-row">
                <span>ინვოისის თანხა</span>
                  <span  >{invoiceAmount} GEL</span>
              </div>
              <div className="table-card-row">
                <span>ინვოისის რაოდეონბა </span>
                  <span   >{invoiceQuantity}</span>
              </div>
              <div className="table-card-row">
                <span>შეკვეთის რაოდენობა </span>
                  <span>{orderQuantity}</span>
              </div>
          
            </article>
          );
        })}
      </section>
    </>
  );
};

export default InvoiceDetailsCards;
