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
import { useLogout } from "../hooks/useLogout";

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

  const {logout} = useLogout()

  const handleLogout = () => {
    logout()
  }

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
            <Link to="/login">
              <img src={ring} alt="" />
            </Link>
            <span onClick={handleLogout}>
              {/* <img src={LogOut} alt="" className="log-out-img" /> */}
              <LogOutSvg2 />
            </span>
          </div>
        </>
      )}
    </header>
  );
};

export default DashboardNavbar;

const LogOutSvg2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      className="log-out-svg-2"
    >
      <defs></defs>
      <g className="cls-1">
        <g id="Layer_3">
          <path
            className="cls-4"
            d="m15.11,47.39h-4.7c-5.46,0-9.91-4.44-9.91-9.91s4.44-9.91,9.91-9.91h30.82c1.18,0,2.13.95,2.13,2.13s-.95,2.13-2.13,2.13H10.41c-3.11,0-5.64,2.53-5.64,5.64s2.53,5.64,5.64,5.64h4.7c1.18,0,2.13.95,2.13,2.13s-.95,2.13-2.13,2.13Z"
          />
          <path
            className="cls-4"
            d="m30.65,44.77c-.55,0-1.09-.21-1.51-.63-.83-.83-.83-2.18,0-3.01l11.42-11.42-11.42-11.42c-.83-.83-.83-2.18,0-3.01.83-.83,2.18-.83,3.01,0l12.93,12.93c.83.83.83,2.18,0,3.01l-12.93,12.93c-.42.42-.96.63-1.51.63Z"
          />
          <g className="cls-3">
            <circle className="cls-2" cx="41.22" cy="30" r="18.28" />
          </g>
          <g className="cls-3">
            <circle className="cls-2" cx="41.22" cy="30" r="11" />
          </g>
          <g className="cls-3">
            <circle className="cls-2" cx="41.22" cy="30" r="11" />
          </g>
        </g>
      </g>
    </svg>
  );
};

const LogOutSvg1 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.15 48.58">
      <g fill="none" isolation="isolate">
        <g id="Layer_1" data-name="Layer 1">
          <g fill="none" mix-blend-mode="multiply" opacity=".8">
            <rect
              x="13.13"
              y=".83"
              width="46.92"
              height="46.92"
              rx="23.46"
              ry="23.46"
              fill="#ff7ba7"
            />
          </g>
          <rect
            x="22.46"
            y="10.16"
            width="28.25"
            height="28.25"
            rx="14.13"
            ry="14.13"
            fill="#FF3360"
            mix-blend-mode="multiply"
          />
          <path
            d="m43.79,22.72l-12.18-12.18c-.78-.79-2.06-.79-2.84,0-.78.78-.78,2.06,0,2.84l8.75,8.75H11.11c-5.15,0-9.34,4.19-9.34,9.34s4.19,9.34,9.34,9.34h4.1s4.75.03,4.75.03c-.61-.62-1.27-1.33-1.84-2.07-.48-.61-.94-1.29-1.34-1.91l-.04-.06h-1.16s-.02,0-.03,0h-4.43c-2.93,0-5.32-2.39-5.32-5.32s2.39-5.32,5.32-5.32h26.41l-8.75,8.75c-.78.78-.78,2.06,0,2.84.39.39.91.59,1.42.59s1.03-.2,1.42-.59l12.18-12.18c.78-.78.78-2.06,0-2.84Z"
            fill="#6e0ff5"
            mix-blend-mode="multiply"
          />
        </g>
      </g>
    </svg>
  );
};
