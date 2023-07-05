import React, { useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const LazyLoader1 = () => {
  return (
    <>
      <LazyLoader1Line />
    </>
  );
};

export default LazyLoader1;

const LazyLoader1Line = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(10);

  console.log(progress)
  
  return (
    <div>
      <LoadingBar
        color="#f11946"
        ref={ref}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <button className="btn btn-success" onClick={() => setProgress(progress + 10)}>Add 10%</button>
      <button className="btn btn-success" onClick={() => setProgress(progress + 20)}>Add 20%</button>
      <button className="btn btn-success" onClick={() => setProgress(100)}>Complete</button>
      {/* <button onClick={() => ref.current.continuousStart()}>
            Start Continuous Loading Bar
          </button>
          <button onClick={() => ref.current.staticStart()}>
            Start Static Loading Bar
          </button>
          <button onClick={() => ref.current.complete()}>Complete</button>
          <br /> */}
    </div>
  );
};
