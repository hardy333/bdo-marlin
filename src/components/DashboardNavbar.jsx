import React from "react";
import gdm from "../assets/icons/gdm.png";
// import ring from "../assets/icons/ringing.png";
// import signOut from "../assets/icons/sign-out.png";

import LogOut from "../assets/log-out.svg";
import LogOut2 from "../assets/navbar/arrow.svg";
import ring from "../assets/navbar/ring.svg";
import user from "../assets/navbar/user.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowBack from "../assets/back-arrow.svg";
import DashAdd from "../assets/dash-add.png";
import DashHouse from "../assets/dash-house.png";
import { BiMenu } from "react-icons/bi";

import "../styles/dashboard-navbar.css";
import PlusSvg from "./svgs/PlusSvg";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";

const startingPages = ["/login", "/register"];

const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let isContract = false;

  if (pathname === "/contract") {
    isContract = true;
  }

  const isStartingPage = startingPages.includes(pathname);

  const backArrow = (
    <img
      onClick={() => navigate(-1)}
      src={arrowBack}
      alt=""
      style={{
        // height: "17px",
        // width: 25,
        marginRight: 10,
        marginLeft: "0px",
        cursor: "pointer",
        marginRight: "auto",
      }}
    />
  );

  const toggleSidebar = () => {
    document.body.classList.toggle("body-sidebar-open");
    document.body.classList.remove("body-sidebar-responsive-close");
  };

  return (
    <header
      className={`dashboard-navbar ${
        isContract ? "dashboard-navbar-fixed" : ""
      }`}
      style={{ height: "63px", flexShrink: 0 }}
    >
      <button className="sidebar-menu-btn" onClick={toggleSidebar}>
        <BiMenu />
      </button>
      {pathname !== "/" ? backArrow : null}

      {isStartingPage ? (
        <>
          <Link to="/login" className="btn abc btn-link btn-blue">
            Login
          </Link>
          <Link to="/register" className="btn btn-outlined btn-blue">
            Register
          </Link>
        </>
      ) : (
        <>
          <div className="navbar-links-container">
            <Link to="/profile">
              <img src={user} alt="" />
            </Link>
            <Link to="/login"  >
              <img src={ring} alt="" />
            </Link>
            <Link to="">
              <img src={LogOut2} alt="" className="log-out-img" />
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default DashboardNavbar;
