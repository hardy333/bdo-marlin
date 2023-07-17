import React, { useState } from "react";
import "../styles/order-details-card.css";
import SlaQuantitySvg from "./svgs/SlaQuantitySvg";
import SlaAmountSvg from "./svgs/SlaAmountSvg";
import SlaOrdersSvg from "./svgs/SlaOrdersSvg";
import { motion, AnimatePresence } from "framer-motion";

const SlaCategoryCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  // category, subCategory, subSubCategory
  const [showingComp, setShowingComp] = useState("category");

  let comp = null;

  if (showingComp === "category") {
    comp = (
      <CategoryCards
        data={data}
        index={showingComp}
        setShowingComp={setShowingComp}
      />
    );
  } else if (showingComp === "subCategory") {
    comp = (
      <SubCategoryCards
        subData={data}
        setShowingComp={setShowingComp}
        index={showingComp}
      />
    );
  }

  return (
    <>
      <section className="table-cards-container">
        <AnimatePresence initial={false}>{comp}</AnimatePresence>
      </section>
    </>
  );
};

// 1
const CategoryCards = ({ data, setShowingComp }) => {
  return (
    <motion.div
      initial={{
        // opacity: 0
        x: -100,
      }}
      animate={{
        x: 0,
        transition:1

      }}
      exit={{
        x: -100,
      }}
      className="flex flex-col gap-5"
    >
      {data.map((row, index) => {
        const {
          productCategory,
          orderedQuantity,
          orderedAmount,
          slaByQuantity,
          slaByAmount,
          inTimeOrders,
        } = row;
        return (
          <article
            onClick={() => {}}
            key={index}
            className="table-card sla-orders-card"
          >
            <header className="table-card-row">
              <h3>
                <span style={{ color: "#6E0FF5" }}>{productCategory} </span>
                {/* <span className="date" >{orderDate}</span> */}
              </h3>
              <div className="box">
                <span>
                  Order Amount:
                  <span className="font-normal ml-2">{orderedAmount} GEL.</span>
                </span>
                <span>
                  Order Quantity:
                  <span className="font-normal ml-2">{orderedQuantity}.</span>
                </span>
              </div>
            </header>

            {/* ------------------------------------- */}
            <div className="table-card-row">
              <span className="label">
                <SlaQuantitySvg />
                SL by quantity
              </span>
              <span>{slaByQuantity} %</span>
            </div>
            <div className="table-card-row">
              <span className="label">
                <SlaAmountSvg />
                SL by amount
              </span>
              <span>{slaByAmount} %</span>
            </div>
            <div className="table-card-row">
              <span className="label">
                <SlaOrdersSvg />
                In time orders
              </span>
              <span>{inTimeOrders} %</span>
            </div>

            <p
              onClick={() => {
                setShowingComp("subCategory");
              }}
              className="text-[10px] d-inline justify-end ml-auto   text-end color hover:text-primary"
              style={{ cursor: "pointer" }}
            >
              See Sub Categories{" "}
            </p>
          </article>
        );
      })}
    </motion.div>
  );
};

// 2
const SubCategoryCards = ({ subData, setShowingComp }) => {
  return (
    <motion.div
      initial={{
        x: 100,
      }}
      animate={{
        x: 0,
        transition:1

      }}
      exit={{
        x: 100,
      }}
      className="flex flex-col gap-5"
    >
      {subData.map((row, index) => {
        const {
          productCategory,
          orderedQuantity,
          orderedAmount,
          slaByQuantity,
          slaByAmount,
          inTimeOrders,
        } = row;
        return (
          <article
            onClick={() => {}}
            key={index}
            className="table-card sla-orders-card"
          >
            <header className="table-card-row">
              <h3>
                <span style={{ color: "#6E0FF5" }}>sub {productCategory} </span>
                {/* <span className="date" >{orderDate}</span> */}
              </h3>
              <div className="box">
                <span>
                  Order Amount:
                  <span className="font-normal ml-2">{orderedAmount} GEL.</span>
                </span>
                <span>
                  Order Quantity:
                  <span className="font-normal ml-2">{orderedQuantity}.</span>
                </span>
              </div>
            </header>

            {/* ------------------------------------- */}
            <div className="table-card-row">
              <span className="label">
                <SlaQuantitySvg />
                SL by quantity
              </span>
              <span>{slaByQuantity} %</span>
            </div>
            <div className="table-card-row">
              <span className="label">
                <SlaAmountSvg />
                SL by amount
              </span>
              <span>{slaByAmount} %</span>
            </div>
            <div className="table-card-row">
              <span className="label">
                <SlaOrdersSvg />
                In time orders
              </span>
              <span>{inTimeOrders} %</span>
            </div>

            <div className="flex justify-between">
              <p
                className="text-[10px] d-inline justify-sart   text-end color hover:text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowingComp("category");
                }}
              >
                See Products{" "}
              </p>

              <p
                className="text-[10px] d-inline justify-end ml-auto   text-end color hover:text-primary"
                style={{ cursor: "pointer" }}
              >
                See Products{" "}
              </p>
            </div>
          </article>
        );
      })}
    </motion.div>
  );
};

export default SlaCategoryCards;
