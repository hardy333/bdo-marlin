import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

const AllOrdersCards = ({ data }) => {
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

  const navigate = useNavigate()

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const { shop, date, vendor, amount, serviceLevel, status } = row;
          console.log({row})
          return (
            <article onClick={() => {
              console.log("CLick")
              navigate("/order-details")
            }} key={shop+index} className="table-card all-orders-card">
              <header className="table-card-row">
                <h3>
                  <span>{vendor}</span>
                </h3>
                <span className="date">{date}</span>
              </header>
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
                  <span style={{ color: "#6E0FF5" }}>{status}</span>
                </Tippy>
              </div>
              <div className="table-card-row">
                <span>Service Level</span>
                <span className={`danger`}>{serviceLevel} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default AllOrdersCards;
