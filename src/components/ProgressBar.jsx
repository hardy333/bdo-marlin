import React from "react";
import "../styles/progress-bar.css";
import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ show }) => {
  const [timerRunning, setTimerRunning] = useState(show);

  useEffect(() => {
    if(!show) return

    const timmer = setTimeout(() => {
      setTimerRunning(false);
    }, 300);

    return () => {
      clearTimeout(timmer);
    };
  }, [show]);

  let progressBarIsShowing 


  if(timerRunning){
    progressBarIsShowing = true
  }

  if(show){
    progressBarIsShowing = true
  }

  if(show === false && timerRunning === false){
    progressBarIsShowing = false
  }


  useEffect(() => {
    console.log("progress bar mount")
    

    return () => {
      console.log("progress bar un mount")
    }
  },[])

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
