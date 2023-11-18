import React from "react";
import "../styles/progress-bar.css";
import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ show }) => {
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if(!show) return

    setTimerRunning(true)

    setTimeout(() => {
      setTimerRunning(false);
    }, 2000);

   
  }, [show]);

  let progressBarIsShowing  = false



  if(show === true || timerRunning === true){
    progressBarIsShowing = true
  }

  // console.log({progressBarIsShowing, timerRunning, show})



  // console.log({progressBarIsShowing})

  return (
    <div
      className="progress-bar"
      style={{ display: progressBarIsShowing ? "" : "none" }}
    >
      <span></span>
    </div>
  );
};

export default ProgressBar;
