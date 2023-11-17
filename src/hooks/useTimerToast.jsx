import { useMediaQuery } from '@uidotdev/usehooks';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';




const useTimerToast = (tableData, tableDataIsLoading, toast) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 510px)");

    
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start: stopwatchStart,
    pause: stopwatchPause,
    reset: stopwatchReset,
  } = useStopwatch({ autoStart: false });

  const [toastId, setToastId] = useState(null);

 

  useEffect(() => {
    if (!tableDataIsLoading) return;
    stopwatchStart();
    console.log("show is loading")
  }, [tableDataIsLoading]);

  useEffect(() => {
    if (seconds === 3) {
      const x = toast.loading("Data is loading, please wait...", {
        position: isSmallDevice ? "bottom-center": 'bottom-right',

        style:{
            minWidth: '300px',
        }
      })
      setToastId(x);
    }
  }, [seconds]);
  console.log({isRunning, seconds})


  useEffect(() => {
    if(!tableData) return
    if(!isRunning) return
    if(seconds >= 3){

        toast.success("Data was loaded", {
            position: isSmallDevice ? "bottom-center": 'bottom-right',
            id: toastId
        })
    }
    stopwatchPause()
  }, [tableData])


  
  useEffect(() => {
    return () => {
      toast.dismiss()
    };
  }, []);

    
  
}

export default useTimerToast