import React, { useEffect, useRef } from "react";
import { useSwiper } from "swiper/react";

const SwiperBtn = (props) => {
  const swiper = useSwiper();
  useEffect(() => {
    // swiper.slideNext();
    if (ref.current) {
      // const x = ref.current.click();
    }
  }, []);

  const ref = useRef();
  // swiper.slideTo(4);
  return (
    <button {...props} ref={ref} onClick={() => swiper.slideTo(5)}>
      {" "}
      Next{" "}
    </button>
  );
};

export default SwiperBtn;
