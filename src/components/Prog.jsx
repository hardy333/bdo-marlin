import React, { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const Prog = ({progress, setProgress}) => {
  const ref = useRef(null);



  

  return (
    <div>
      <LoadingBar
        color="#6E0FF5"
        shadow={true}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <button onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button onClick={() => setProgress(100)}>Complete</button> */}
    </div>
  );
};

export default Prog;
