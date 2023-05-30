import React from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardAsideLight from "../components/DashboardAsideLight";
import { Outlet } from "react-router";

const DashboardLayout = ({ children, light = false, staticMain = false }) => {
  return (
    <div className="dashboard">
      {light ? <DashboardAsideLight left={true} /> : <DashboardAside />}
      <DashboardNavbar />
      <main className={`dashboard-main ${staticMain ? "static" : ""}`}>
        {/* {children} */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
