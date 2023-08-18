import React from "react";
import "../styles/discount-card.css";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";
import { useNavigate } from "react-router-dom";
import CrystalSvg from "./svgs/CrystalSvg";

import { motion } from "framer-motion";

const DiscountCard = ({planAmount, condition, selectedVendor,index, retroBonusID, retroPercent, status, startDate, documentNo, isBonusCard }) => {
  const navigate = useNavigate();


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
      className={`discount-card ${isBonusCard ? "discount-card-bonus" : ""}`}
      
    >
      <h2>
        <span style={{color: "#211543" }}>
        {/* {documentNo}  */}
        </span>
         <span className=" block mb-3" style={{width: "100%", textAlign: "center" }}>  {retroPercent}%</span> 
      </h2>
      <h3 className="" style={{}}>დოკუმენტი: #{documentNo}</h3>
      {index > 3 ? (
        <></>
      ) : (
        <div className="discount-card__new-img">
          <CrystalSvg />
        </div>
      )}

      <div className="discount-card__body ">
        <h4 className="mb-5  pb-2">
          <VendorsCalendarSvg />
          {status}
        </h4>
        <p>{startDate?.split("T")[0]} - present</p>
      </div>

      <button
        onClick={() => {
          if (isBonusCard) {

            const urlParams = new URLSearchParams();
            urlParams.append("retroBonusID", retroBonusID);
            urlParams.append("documentNo", documentNo);
            urlParams.append("startDate", startDate);
            urlParams.append("vendor", selectedVendor.value);
            urlParams.append("planAmount", planAmount);
            urlParams.append("condition", condition);

            navigate("/cash-back-table?" + urlParams.toString());

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
