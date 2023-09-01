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

          const { shop, orderAmount, invoiceAmount, date, vendor} = row;

          console.log(row)
          
          
          return (
            <article
              key={index}
              className="table-card all-orders-card"
              style={{ borderLeft: `1px solid rgb(255, 51, 96) ` }}
            >
              <div className="table-card-row">
                <span>მაღაზია</span>
                <span>{shop}</span>
              </div>
              <div className="table-card-row">
                <span>მომწოდებელი</span>
                <span>{vendor} GEL</span>
              </div>
              <div className="table-card-row">
                <span>თარიღი</span>
                  <span   >{date}</span>
              </div>
              <div className="table-card-row">
                <span>შეკვეთის თანხა </span>
                  <span   >{orderAmount}</span>
              </div>
              <div className="table-card-row">
                <span>ინვოისის თანხა</span>
                  <span   >{invoiceAmount}</span>
              </div>
          
            </article>
          );
        })}
      </section>
    </>
  );
};

export default InvoiceDetailsCards;
