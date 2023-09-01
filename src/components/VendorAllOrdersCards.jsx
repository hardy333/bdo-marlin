import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";

const VendorAllOrdersCards = ({ data }) => {
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
          const { shop, amount, scheduled, status} = row;
          let color = "";

          if (status === "გაგზავნილია") {
            color = "#FFC23C";
          } else if (status === "მიწოდებულია") {
            color = "#01C6B5";
          } else if (status === "პროცესშია") {
            color = "#6E0FF5";
          } else if (status === "დადასტურებულია") {
            color = "#FF7BA7";
          } else if (status === "გასაგზავნია") {
            color = "#f55364";
          }
          

          return (
            <article
              key={index}
              className="table-card all-orders-card"
              style={{ borderLeft: `4px solid ${color}` }}
            >
              
              <div className="table-card-row">
                <span>Shop</span>
                <span>{shop}</span>
              </div>
              <div className="table-card-row">
                <span>Amount</span>
                <span>{amount} GEL</span>
              </div>
              <div className="table-card-row">
                <span>Status</span>
                <Tippy
                  className="tooltip-1"
                  arrow={false}
                  placement="left"
                  content="delevered"
                >
                  <span  style={{ color: color }} >{status}</span>
                </Tippy>
              </div>
              <div className="table-card-row">
                <span>scheduled</span>
                <span className={`danger`}>{scheduled}</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default VendorAllOrdersCards;
