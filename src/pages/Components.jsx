import React, { useState } from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardAsideLight from "../components/DashboardAsideLight";

const Components = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className="p-10 ps-80 bg-green-500 h-[500px]">
        <DashboardAside selected={true} left={!isChecked} />
        <DashboardAsideLight selected={true} left={isChecked} />
        <div>
          <div className="toggle-switch">
            <input
              className="toggle-input"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="toggle"
              type="checkbox"
            />
            <label className="toggle-label" htmlFor="toggle"></label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Components;
