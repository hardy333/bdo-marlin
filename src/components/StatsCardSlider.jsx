import React, { useState } from "react";
import StatsCard from "./StatsCard";
import "../styles/stats-card-slider.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const statsData = [
  {
    name: "მაღაზიები123",
    value: 324,
  },
  {
    name: "ასორტიმენტი",
    value: 4534,
  },
  {
    name: "მომწოდებლები",
    value: 523,
  },
  {
    name: "ღია შეკვეთები",
    value: 646,
  },
  {
    name: "ფასდაკლებები",
    value: 64,
  },
  {
    name: "რეტრო ბონუსები",
    value: 84,
  },
];

const StatsCardSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 2,
      spacing: 15,
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="navigation-wrapper ">
      <div className="stats-card-slider-container keen-slider" ref={sliderRef}>
        {statsData.map((stat, index) => {
          const { name, value } = stat;
          return <StatsCard key={index} name={name} value={value} />;
        })}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === 4}
          />
        </>
      )}
    </div>
  );
};

export default StatsCardSlider;

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  console.log("Arrow");
  return (
    <>
      {props.left && (
        <FaAngleLeft
          onClick={props.onClick}
          className={`arrow ${
            props.left ? "arrow--left" : "arrow--right"
          } ${disabeld}`}
        />
      )}

      {!props.left && (
        <FaAngleRight
          onClick={props.onClick}
          className={`arrow ${
            props.left ? "arrow--left" : "arrow--right"
          } ${disabeld}`}
        />
      )}
    </>
  );
}
