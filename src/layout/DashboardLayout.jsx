import React from "react";
import DashboardAside from "../components/DashboardAside";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardAsideLight from "../components/DashboardAsideLight";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import messengerImg from "../assets/messenger.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import DashboardAsideVendors from "../components/DashboardAsideVendors";

const staticMainPathnames = ["/login", "/register", "/set-password"];

const DashboardLayout = ({ light = false }) => {
  const location = useLocation();
  const pathname = location.pathname;
  let staticMain = false;
  if (staticMainPathnames.includes(pathname)) {
    staticMain = true;
  }

  let classN = "";

  if (pathname === "/") {
    classN = "dashboard--dash";
  }
  const pageName = pathname.slice(1)

  const {user} = useAuthContext()

  return (
    <div className={`dashboard ${classN} ${pageName}-page ${pageName === "vendor-all-orders-vendor" ? "all-orders-parent-page" : ""}`}>
      <button className="btn-messenger">
        <img src={messengerImg} alt="" />
      </button>
      {user.decodedToken.IsRetail === "1" ?  <DashboardAside /> : <DashboardAsideVendors />}
      <DashboardNavbar />
      <main className={`dashboard-main ${staticMain ? "static" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
