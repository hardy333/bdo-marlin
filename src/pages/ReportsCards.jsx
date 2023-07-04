import React from "react";
import "../styles/order-details-card.css";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

import {AiOutlineFieldTime} from "react-icons/ai"
import {RiMoneyDollarCircleLine} from "react-icons/ri"
import {FaLayerGroup} from "react-icons/fa"

const ReportsCards = ({ data }) => {
  if (!data) {
    return <h1>Loading ...</h1>;
    
  }

  const navigate = useNavigate()

  return (
    <>
      <section className="table-cards-container">
        {data.map((row, index) => {
          const {  orders, vendor, amount, slaByQuantity,slaByAmount, inTimeOrders } = row;
          return (
            <article onClick={() => {
                navigate("/sla-by-orders")
            }} key={index} className="table-card reports-card sla-card">
              <header className="table-card-row">
                <h3>
                  <span style={{color: "#6E0FF5"}}>{vendor}</span>
                </h3>
                <div className="box">
                    <span>შეკვეთები: {orders}</span>
                    <span>თანხა: {amount} GEL</span>
                </div>
              </header>

              {/* ------------------------------------- */}
              <div className="table-card-row">
                <span className="label"> <FaLayerGroup /> SL by quantity</span>
                <span >{slaByQuantity} %</span>
              </div>
              <div className="table-card-row">
                <span className="label"> <RiMoneyDollarCircleLine /> SL by amount</span>
                <span>{slaByAmount} %</span>
              </div>
              <div className="table-card-row">
                <span className="label" > <AiOutlineFieldTime /> In time orders</span>
                <span >{inTimeOrders} %</span>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default ReportsCards;
