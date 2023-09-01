// CalendartableCards
import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";

const days = ["M", "T", "W", "T", "F", "S", "S"];


const CalendartableCards = ({ data }) => {
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
      <section className="table-cards-container" style={{ width: "100%" }}>
        {data.map((row, index) => {
          const { Vendor, Brand, Shop } = row;
          const shopAddress = row["Shop Address"];
          const shopName = "shop" + Shop;

          //   Days logic
          const d1 = Math.floor(Math.random() * 6);
          const d2 = Math.floor(Math.random() * 6);

          let isTwo = false;
          let tooltipText = "ყველ კვირა";

          if (Math.random() - 0.5 > 0) {
            isTwo = true;
            tooltipText = "2 კვირაში ერთხელ";
          }

          return (
            <article
              key={index}
              className="table-card all-orders-card"
              style={{ borderLeft: `1px solid rgb(110, 15, 245)` }}
            >
              <div className="table-card-row">
                <span>მაღაზია</span>
                <span>{shopName}</span>
              </div>
              <div className="table-card-row">
                <span>მომწოდებელი</span>
                <span>{Vendor} </span>
              </div>
              <div className="table-card-row">
                <span>მისამართი</span>
                <span>{shopAddress}</span>
              </div>
              <div className="table-card-row">
                <span>ბრენდი</span>
                <span>{Brand} </span>
              </div>
              <div className="table-card-row">
                <span>მოწოდება</span>
                <div className="dis-date-container">
                  <div className="days-container">
                    {days.map((d, index) => (
                      <span
                        key={d + index}
                        style={{
                          color:
                            d1 === index || d2 == index ? "#211543" : "#AE9EDC",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <Tippy
                    className="tooltip-1"
                    arrow={false}
                    placement="top"
                    content={tooltipText}
                  >
                    <div className="circle-container">
                      <span className={`circle active`}></span>
                      <span
                        className={`circle active ${isTwo ? " stroked" : ""}`}
                      ></span>
                    </div>
                  </Tippy>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default CalendartableCards;
