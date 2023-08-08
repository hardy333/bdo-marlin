import React from "react";
import CountUp from "react-countup";

const StatsCard = ({name, value}) => {
  return (
    <div className="stat-card  keen-slider__slide">
      <h3>{name}</h3>
      <CountUp useEasing={false} start={0} end={value} duration={0.5} delay={0}>
        {({ countUpRef }) => <h2 ref={countUpRef}>{value}</h2>}
      </CountUp>
    </div>
  );
};

export default StatsCard;
