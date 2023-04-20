import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Switch } from "@mui/material";
import "../styles/switch.css";

const Test = () => {
  return (
    <DashboardLayout>
      <div style={{ paddingLeft: "100px" }}>
        <div class="switch">
          <input type="checkbox" id="switch1" class="switch__input" />
          <label htmlFor="switch1" class="switch__label">
            Switch 1
          </label>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Test;
