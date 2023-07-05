import React from "react";
import { Blocks, MutatingDots, ThreeDots } from "react-loader-spinner";

const Loader2 = ({ color }) => {
  return (
    <>
      <div className="main-loader-conatiner">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color={color}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader2;
