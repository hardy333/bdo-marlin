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
    </div>
  );
};

export default Prog;
