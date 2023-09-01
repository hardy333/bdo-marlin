// BonusTableCards

import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";

const BonusTableCards = ({ data }) => {
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

          const { product, barcode, retroPercent} = row;
          console.log(row)

          return (
            <article
              key={index}
              className="table-card all-orders-card"
              style={{ borderLeft: `1px solid rgb(255, 51, 96) ` }}
            >
              <div className="table-card-row">
                <span>პროდუქტი</span>
                <span>{product}</span>
              </div>
              <div className="table-card-row">
                <span>ბონუსი</span>
                <span>{retroPercent} GEL</span>
              </div>
              <div className="table-card-row">
                <span>ბარკოდი</span>
                
                  <span   >{barcode}</span>
              </div>
          
            </article>
          );
        })}
      </section>
    </>
  );
};

export default BonusTableCards;
