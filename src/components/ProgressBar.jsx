import React from "react";
import "../styles/progress-bar.css";
import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ show }) => {
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    setTimesUp(false);

    const time = setInterval(() => {
      setTimesUp(true);
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  let isShowing = false
  if(show){
    isShowing =  true
  }else{
    if(!timesUp){
        isShowing = true
    }
  }
 

  console.log(show, timesUp, isShowing)
  
  return (
    <div
      className="progress-bar"
      style={{ display: isShowing ? "" : "none" }}
    >
      <span></span>
    </div>
  );
};

export default ProgressBar;
