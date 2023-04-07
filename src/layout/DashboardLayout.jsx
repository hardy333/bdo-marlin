import React from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <DashboardAside />
      <DashboardNavbar />
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
