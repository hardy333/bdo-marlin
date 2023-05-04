import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/switch.css";
import ReactPaginate from "react-paginate";
import "../styles/pag-test.css";
import "../styles/status-component.css";

const items = Array.from({ length: 1000 }).map((_, index) => index);

const Test = () => {
  return (
    <DashboardLayout>
      <div style={{ paddingLeft: "100px" }}>
        <div className="status-container">
          <ul>
            <li>In Progress</li>
            <li>Something 11:06, 2/10/2023</li>
            <li>Received 11:06, 2/10/2023</li>
            <li>Sent 11:06, 2/10/2023</li>
          </ul>
        </div>
      </div>

      <h2>Hello</h2>
    </DashboardLayout>
  );
};

export default Test;
