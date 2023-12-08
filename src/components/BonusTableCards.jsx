// BonusTableCards

import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";

// 025616042138
// 025616042145
// 025616102504
// 025616402505

// ცივი ყავა /მისტერ ბრაუნი კაპუჩინო/ 240მლ
// ცივი ყავა /მისტერ ბრაუნი /240მლ
// ცივი ყავა/მისტერ ბრაუნი/240მლ
// ვისკი/ჩივას რეგალი 40%/ 0.05 ლ (FR)

const BonusTableCards = ({}) => {
  // return <h1>Loading ...</h1>;
  const data = [
    {
      product: "ცივი ყავა /მისტერ ბრაუნი კაპუჩინო/ 240მლ",
      barcode: 76846874368746,
      retroPercent: 6,
    },
    {
      product: "ცივი ყავა /მისტერ ბრაუნი /240მლ",
      barcode: "025616042145",
      retroPercent: 6,
    },
    {
      product: "ცივი ყავა/მისტერ ბრაუნი/240მლ",
      barcode: "025616102504",
      retroPercent: 6,
    },
    {
      product: "ვისკი/ჩივას რეგალი 40%/ 0.05 ლ (FR)",
      barcode: "025616102504",
      retroPercent: 6,
    },
  ];

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const { product, barcode, retroPercent } = row;
          console.log(row);

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
                <span>{retroPercent} %</span>
              </div>
              <div className="table-card-row">
                <span>ბარკოდი</span>

                <span>{barcode}</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default BonusTableCards;
