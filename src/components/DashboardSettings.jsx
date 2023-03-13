import React from "react";
import filter from "../assets/icons/filter.png";
import filterList from "../assets/icons/list.png";
import search from "../assets/icons/search.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";

const DashboardSettings = ({
  type,
  setType,
  option,
  setOption,
  searchValue,
  setSearchValue,
  options,
}) => {
  let carouselItems;
  let carousel;

  if (options) {
    carousel = (
      <Swiper
        className="mySwiper"
        slidesPerView={5}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
      >
        {options.map((currOption) => (
          <SwiperSlide key={currOption} onClick={() => setOption(currOption)}>
            <div
              className={`carousel-item ${
                option === currOption ? "active" : ""
              }`}
            >
              {currOption}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <header className="settings">
      <div className="settings__top">
        <h1>SPAR Service Level Report</h1>

        <div className="settings__filters">
          <button>
            <img src={filter} alt="" />
          </button>
          <button>
            <img src={filterList} alt="" />
          </button>
          <button>
            <img src={search} alt="" />
          </button>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="settings__bottom">
        {/* Carousel */}
        <div className="">{carousel || ""}</div>

        {/*  */}
        <div className="options-container">
          <div className="input-group">
            <input
              type="radio"
              id="By item"
              name="type"
              checked={type === "By item"}
              onChange={(e) => {
                setType("By item");
                setOption("Snacks");
              }}
            />
            <label htmlFor="By item">By item</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="By shop"
              name="type"
              checked={type === "By shop"}
              onChange={(e) => {
                setType("By shop");
                setOption("N.Ramishvili 33");
              }}
            />
            <label htmlFor="By shop">By shop</label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardSettings;
