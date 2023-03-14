import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "../styles/swip.css";
import SwiperBtn from "./SwiperBtn";

export default function Swip() {
  return (
    <>
      <Swiper
        className="mySwiper"
        slidesPerView={5}
        spaceBetween={11}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        // onSlideChange={(e) => {
        //   console.log(e);
        // }}
        onSwiper={(swiper) => {
          swiper.slideTo(2 - 1);
        }}
      >
        <button className="swiper-button-prev">X</button>
        <button className="swiper-button-next">Y</button>
        <SwiperSlide>
          <div className="slider-item">Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 4</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 5</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 6</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 7</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 8</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 9</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 10</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 11</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 12</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-item">Slide 13</div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
