import React, { useState } from "react";
import { motion } from "framer-motion";
import { useStateManager } from "react-select";

const variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.1 + 0.2 },
  }),
  exit: {
    opacity: 1,
    y: 10,
  },
};

const RightChartBubbles = () => {
  const [smallCircles] = useState([1, 2, 3, 4]);
  const [hoverI, setHoverI] = useState(null);

  const hoverStart = (e, num) => {
    setHoverI(num);
  };

  const hoverEnd = () => {
    setHoverI(null);
  };

  return (
    <div className="right-chart-buttons">
      <div className="left">
        <div className={`c-big c-big-1  ${hoverI === 1 ? "active" : ""}`}></div>
        <div className={`c-big c-big-2  ${hoverI === 2 ? "active" : ""}`}></div>
        <div className={`c-big c-big-3  ${hoverI === 3 ? "active" : ""}`}></div>
        <div className={`c-big c-big-4  ${hoverI === 4 ? "active" : ""}`}></div>
      </div>
      <div className="right">
        <ul>
          {smallCircles.map((num) => (
            <motion.li
              onHoverEnd={(e) => hoverEnd(e, num)}
              onHoverStart={(e) => hoverStart(e, num)}
              key={num}
              custom={num - 1}
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              className={`c-small-li c-small-li-${num} ${
                hoverI === num ? "active" : ""
              }`}
            >
              <span className={`c-small c-small-${num}`}></span>
              <span>მომწოდებელი {num}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightChartBubbles;
