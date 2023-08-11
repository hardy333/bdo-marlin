import React from "react";
import "../styles/order-details-card.css";
import TriangleSvg from "./svgs/TriangleSvg";
import Tippy from "@tippyjs/react";

const CatalogueCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <section className="table-cards-container  w-full">
        {data.map((row, index) => {
          const {
            status,
            price,
            barcode,
            product,
            lastOrderPrice,
            lastChangeDate,
          } = row;
          return (
            <article
              onClick={() => {
                navigate("/order-details");
              }}
              key={index}
              className="table-card all-orders-card"
            >
              <header className="table-card-row">
                <h3>
                  <span>
                    barcode: <span className="font-normal">{barcode}</span>
                  </span>
                </h3>
                <span className="date">
                  <Tippy
                    className="tooltip-2"
                    arrow={false}
                    trigger="click"
                    placement="top"
                    content={
                      <div className="catalogue-popup-content">
                        <span>
                          <span>Last Cahnge Date</span>
                          <span>{lastChangeDate?.split("T")[0]}</span>
                        </span>
                        <span>
                          <span>Last price</span>
                          <span>{lastOrderPrice}</span>
                        </span>
                      </div>
                    }   
                  >
                    <span className="" style={{cursor: "pointer"}}>
                      <TriangleSvg
                        fill={"#6E0FF5"}
                        style={{
                          transform: true ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </span>
                  </Tippy>
                </span>
              </header>
              {/* 1 */}
              <div className="table-card-row">
                <span>Product</span>
                <Tippy
                  className="tooltip-1"
                  arrow={false}
                  placement="bottom"
                  content={product}
                >
                  <span
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    //   height: "30px",
                      display: "block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product} GEL
                  </span>
                </Tippy>
              </div>
              {/* 2 */}
              <div className="table-card-row">
                <span>Price</span>
                <span>{price}</span>
              </div>
              {/* 3 */}
              <div className="table-card-row">
                <span>Status</span>
                <span className="text-primary">{status}</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default CatalogueCards;
