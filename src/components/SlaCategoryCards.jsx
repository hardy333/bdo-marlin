import React, { useEffect, useRef, useState } from "react";
import "../styles/order-details-card.css";
import SlaQuantitySvg from "./svgs/SlaQuantitySvg";
import SlaAmountSvg from "./svgs/SlaAmountSvg";
import SlaOrdersSvg from "./svgs/SlaOrdersSvg";
import { motion, AnimatePresence } from "framer-motion";

const durationTime = 0.3;

const SlaCategoryCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
  }

  // category, subCategory, subSubCategory
  const [showingComp, setShowingComp] = useState("category");
  const [prevShowingComp, setPrevShowingComp] = useState("category")

  let comp = null;

  const prevComp = useRef("category");

  if (showingComp === "category") {
    comp = (
      <CategoryCards
        data={data}
        index={showingComp}
        setShowingComp={setShowingComp}
        prevComp={prevComp}
        setPrevShowingComp={setPrevShowingComp}
      />
    );
  } else if (showingComp === "subCategory") {
    comp = (
      <SubCategoryCards
        subData={data}
        setShowingComp={setShowingComp}
        index={showingComp}
        prevComp={prevComp}
        setPrevShowingComp={setPrevShowingComp}
        prevShowingComp={prevShowingComp}

      />
    );
  } else if (showingComp === "subSubCategory") {
    comp = (
      <SubSubCategoryCards
        subSubData={data}
        setShowingComp={setShowingComp}
        index={showingComp}
        prevComp={prevComp}
        setPrevShowingComp={setPrevShowingComp}
      />
    );
  }

  return (
    <>
      <section
        className="table-cards-container"
        style={{ overflowX: "hidden", overflowY: "visible" }}
      >
        <AnimatePresence
          // mode={"popLayout"}
          initial={false}
        >
          {comp}
        </AnimatePresence>
      </section>
    </>
  );
};

// 1
const CategoryCards = ({ data, setShowingComp, prevComp,setPrevShowingComp }) => {
  useEffect(() => {
    return () => {
      prevComp.current = "category";
      console.log("112");
    };
  }, []);
  return (
    <motion.div
      initial={{
        // opacity: 0
        x: -100,
      }}
      animate={{
        x: 0,
        // transition:{
        //     duration:  durationTime
        // }
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

                setPrevShowingComp("category")
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
const SubCategoryCards = ({
  subData,
  setShowingComp,
  showingComp,
  prevComp,
  setPrevShowingComp,
  prevShowingComp
}) => {
  console.log(prevComp.current === "category", "....");
  useEffect(() => {
    return () => {
      prevComp.current = "subCategory";
    };
  }, []);

  return (
    <motion.div
      initial={{
        x: prevShowingComp === "category" ? 100 : -100,
      }}
      animate={{
        x: 0,
        // transition:{
        //     duration:  durationTime
        // }
      }}
      exit={{
        x: prevShowingComp === "category" ? -100 : 100,
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
            <div
              className="table-card-row border-b-0"
              style={{
                borderBottom: "none",
              }}
            >
              <span className="label">
                <SlaOrdersSvg />
                In time orders
              </span>
              <span>{inTimeOrders} %</span>
            </div>

            <div className="flex justify-between">
              {/* <p
                className="text-[10px] pl-1 d-inline justify-sart   text-end color hover:text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowingComp("category");
                  setPrevShowingComp("subCategory")
                }}
              >
                Back{" "}
              </p> */}

              <p
                className="text-[10px] d-inline justify-end ml-auto   text-end color hover:text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowingComp("subSubCategory");
                  setPrevShowingComp("subCategory")
                }}
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

// 3
const SubSubCategoryCards = ({ subSubData, setShowingComp, prevComp,setPrevShowingComp }) => {
  useEffect(() => {
    return () => {
      prevComp.current = "subSubCategory";
    };
  }, []);
  return (
    <motion.div
      initial={{
        x: 100,
      }}
      animate={{
        x: 0,
        // transition:{
        //     duration:  durationTime
        // }
      }}
      exit={{
        x: 100,
      }}
      className="flex flex-col gap-5"
    >
      {subSubData.map((row, index) => {
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
                <span style={{ color: "#6E0FF5" }}>პროდუქტი 1. </span>
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
            <div
              className="table-card-row border-b-0"
              style={{
                borderBottom: "none",
              }}
            >
              <span className="label">
                <SlaOrdersSvg />
                In time orders
              </span>
              <span>{inTimeOrders} %</span>
            </div>

            <div className="flex justify-start">
              <p
                className="text-[10px] pl-1 d-inline justify-sart   text-end color hover:text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowingComp("subCategory");
                  setPrevShowingComp("subSubCategory")
                }}
              >
                Back{" "}
              </p>
            </div>
          </article>
        );
      })}
    </motion.div>
  );
};
export default SlaCategoryCards;
