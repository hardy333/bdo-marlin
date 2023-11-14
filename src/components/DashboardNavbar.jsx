import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowBack from "../assets/back-arrow.svg";
import { BiMenu } from "react-icons/bi";

import "../styles/dashboard-navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

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

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login")
  };

  const {user} = useAuthContext()

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
              {/* <img src={user} alt="" /> */}
              <UserSvg />
              <span style={{paddingLeft: "10px", fontFamily: "Inter"}}>{user.decodedToken.FirstName}</span>
            </Link>
            <Link to="/">
              {/* <img src={ring} alt="" /> */}
              <RingSvg />
            </Link>
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
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



const RingSvg = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className="navbar-ring-icon">
        <g className="cls-1" isolation="isolate">
          <g id="Layer_3">
            <g className="cls-3" mixblendmode="multiply" opacity="0.8">
              <path
                className="cls-2"
                fill="#ff7ba7"
                d="m37.74,59.5h-17.34c-1.2,0-2.18-.98-2.18-2.18s.98-2.18,2.18-2.18h17.34c1.2,0,2.18.98,2.18,2.18s-.98,2.18-2.18,2.18Z"
              />
            </g>
            <path
              className="cls-4"
              fill="#6e0ff5"
              d="m52.97,42.02c0,3.97-3.19,7.2-7.2,7.2H12.35c-1.99,0-3.79-.82-5.07-2.13-1.31-1.28-2.13-3.08-2.13-5.07,0-2.85,1.63-5.29,4-6.46,1.63-.8,2.59-2.52,2.59-4.33,0-3.34,0-7.78,0-7.78,0-9.57,7.76-17.3,17.33-17.3,4.79,0,9.11,1.95,12.26,5.07,3.12,3.12,5.07,7.44,5.07,12.23,0,0,0,4.6,0,7.95,0,1.81,1.08,3.39,2.69,4.22.66.34,1.25.77,1.77,1.29,1.28,1.31,2.09,3.08,2.09,5.1Z"
            />
            <g className="cls-3" mixblendmode="multiply" opacity="0.8">
                
              <circle className="cls-2" fill="#ff7ba7" cx="40.76" cy="14.58" r="14.08" />
            </g>
                
            <g className="cls-3"  mixblendmode="multiply" opacity="0.8">
              <circle className="cls-2" fill="#ff7ba7" cx="40.76" cy="14.58" r="9.39" />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

const UserSvg = () => {
  return (
    <>
      <svg id="Layer_3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <defs></defs>
        <circle className="cls-3" fill="#6e0ff5" cx="30" cy="30" r="29" />
        <g className="cls-2" opacity="0.97">
          <path
            className="cls-1"
            fill="#ffffff"
            d="m45.88,40.35v2.21c0,3.45-2.79,6.24-6.24,6.24h-19.28c-3.45,0-6.24-2.8-6.24-6.24v-2.21c0-3.78,1.68-7.17,4.34-9.45,1.27-1.09,3.12-1.03,4.42.02,1.94,1.57,4.42,2.52,7.11,2.52s5.17-.94,7.11-2.51c1.3-1.05,3.16-1.11,4.42-.02,2.66,2.28,4.34,5.67,4.34,9.45Z"
          />
          <path
            className="cls-1"
            fill="#ffffff"
            d="m39.27,20.24c0,2.62-1.09,4.99-2.84,6.67-1.66,1.61-3.94,2.6-6.44,2.6s-4.77-.99-6.43-2.6c-1.76-1.68-2.85-4.05-2.85-6.67,0-5.12,4.17-9.28,9.28-9.28s9.28,4.16,9.28,9.28Z"
          />
        </g>
      </svg>
    </>
  );
};

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
          <g fill="none" mixblendmode="multiply" opacity=".8">
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
            mixblendmode="multiply"
          />
          <path
            d="m43.79,22.72l-12.18-12.18c-.78-.79-2.06-.79-2.84,0-.78.78-.78,2.06,0,2.84l8.75,8.75H11.11c-5.15,0-9.34,4.19-9.34,9.34s4.19,9.34,9.34,9.34h4.1s4.75.03,4.75.03c-.61-.62-1.27-1.33-1.84-2.07-.48-.61-.94-1.29-1.34-1.91l-.04-.06h-1.16s-.02,0-.03,0h-4.43c-2.93,0-5.32-2.39-5.32-5.32s2.39-5.32,5.32-5.32h26.41l-8.75,8.75c-.78.78-.78,2.06,0,2.84.39.39.91.59,1.42.59s1.03-.2,1.42-.59l12.18-12.18c.78-.78.78-2.06,0-2.84Z"
            fill="#6e0ff5"
            mixblendmode="multiply"
          />
        </g>
      </g>
    </svg>
  );
};
