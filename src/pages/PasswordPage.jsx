import React, { useState } from "react";

const PasswordPage = () => {
  const [passVal, setPassVal] = useState("");
  const [grid, setGrid] = useState([

  ])

  return (
    <div>
      <h2>PasswordPage</h2>

      <hr />
      <br />
      <br />

      <div>
        <input className="input" type="password" placeholder="Enter Password" />
        <p>{passVal}</p>

        <div className="grid grid-cols-3 gap-1 w-[400px]">
            <div className="cell bg-green-100  h-[7px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[7px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[7px] border-2  border-black"></div>
            {/* <div className="cell bg-green-100  h-[70px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[70px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[70px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[70px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[70px] border-2  border-black"></div>
            <div className="cell bg-green-100  h-[70px] border-2  border-black"></div> */}
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
