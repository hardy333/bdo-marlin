import React from "react";
import "../styles/discount-card.css";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";
import ayeeSvg from "../assets/ayee.png";
import EyeSvg from "./svgs/EyeSvg";
import NewSvg from "./svgs/NewSvg";
import { useNavigate } from "react-router-dom";
import CrystalSvg from "./svgs/CrystalSvg";

const DiscountCard = ({ index, name, dis, isBonusCard }) => {
  const navigate = useNavigate();


  console.log(isBonusCard)

  return (
    <article className="discount-card"
    style={{background: isBonusCard ? "rgba(111, 15, 245, 0.056)" : "#fff"}}
    >
      <h2>{name} - {dis}%</h2>
      <h3>დოკუმენტი: #{Math.floor(Math.random()*2000+30330)}</h3>
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
          navigate("/discounts-table");
        }}
        className="btn btn-success"
      >
        ნახე პროდუქცია
      </button>
    </article>
  );
};

export default DiscountCard;
