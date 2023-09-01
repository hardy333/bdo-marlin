import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";



const OrderDetailsCards = ({ data, date, status, statusBg, vendor }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }


  // useEffect(() => {
  //   console.log("Order details card mount")
  //   return () => {
  //   console.log("Order details card un-mount")

  //   }
  // }, [])
  
  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {
            barcode,
            quantity,
            product,
            reservedQuantity,
            amount, 
            price
          } = row;
          return (
            <article key={index} className="table-card order-details-card">
              <div className="table-card-row">
                <span>ბარკოდი</span>
                <span>{barcode}</span>
              </div>
              <div className="table-card-row">
                <span>პროდუქტი</span>
                <Tippy
                className="tooltip-1"
                arrow={false}
                placement="top"
                content={`${product}`}
              >
                <span>{product}</span>
                </Tippy>
              </div>
              <div className="table-card-row">
                <span>თანხა</span>
                <span>{amount} GEL</span>
              </div>
              <div className="table-card-row">
                <span>ფასი</span>
                <span>{price} GEL</span>
              </div>
              <div className="table-card-row">
                <span>რაოდენობა</span>
                <span>{quantity}</span>
              </div>
              <div className="table-card-row">
                <span>დარეზერვებული</span>
                <span className={`danger`}>{reservedQuantity}</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default OrderDetailsCards;
