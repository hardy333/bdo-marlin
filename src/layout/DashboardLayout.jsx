import React from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardAsideLight from "../components/DashboardAsideLight";

const DashboardLayout = ({ children, light = false }) => {
  return (
    <div className="dashboard">
      {light ? <DashboardAsideLight left={true} /> : <DashboardAside />}
      <DashboardNavbar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
