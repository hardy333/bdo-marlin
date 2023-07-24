import React from "react";
import "../styles/discount-card.css";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";
import { useNavigate } from "react-router-dom";
import CrystalSvg from "./svgs/CrystalSvg";

import { motion } from "framer-motion";

const DiscountCard = ({ index, name, dis, isBonusCard }) => {
  const navigate = useNavigate();

  console.log(isBonusCard);

  return (
    <motion.article
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ 
        opacity: 0,
        y: -10,
      }}
      className="discount-card"
      style={{
        background: isBonusCard ? "rgba(111, 15, 245, 0.056)" : "#fff",
        border: isBonusCard ? null : "1px solid rgba(111, 15, 245, 0.106)",
      }}
    >
      <h2>
        {name} - {dis}%
      </h2>
      <h3>დოკუმენტი: #{Math.floor(Math.random() * 2000 + 30330)}</h3>
      {index > 3 ? (
        <></>
      ) : (
        <div className="discount-card__new-img">
          <CrystalSvg />
        </div>
      )}

      <div className="discount-card__body">
        <h4>
          <VendorsCalendarSvg />
          {Math.random() - 0.4 > 0 ? "აქტიურია" : "არააქტიურია"}
        </h4>
        <p>1/02/2023 - 10/02/2023</p>
      </div>

      <button
        onClick={() => {
          if (isBonusCard) {
            navigate("/cash-back-table");
          } else {
            navigate("/discounts-table");
          }
        }}
        className="btn btn-success"
      >
        ნახე პროდუქცია
      </button>
    </motion.article>
  );
};

export default DiscountCard;
