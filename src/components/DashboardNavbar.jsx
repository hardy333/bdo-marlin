import React from "react";
import gdm from "../assets/icons/gdm.png";
// import ring from "../assets/icons/ringing.png";
// import signOut from "../assets/icons/sign-out.png";

import arrow from "../assets/navbar/arrow.svg";
import ring from "../assets/navbar/ring.svg";
import user from "../assets/navbar/user.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/all-orders/arrow-left.svg";
import arrowLeftNew from "../assets/all-orders/arrow-left-new.svg";
import arrowBack from "../assets/back-arrow.svg";

import "../styles/dashboard-navbar.css";

const startingPages = ["/login", "/register"];

const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  return (
    <header
      className="dashboard-navbar"
      style={{ height: "63px", flexShrink: 0 }}
    >
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
          <div
            className="gdm-container cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <a href="#">
              <img src={user} alt="" />
            </a>
            <span style={{ fontWeight: 700 }}>Daily</span>
          </div>

          <Link to="/login" style={{ marginRight: 10 }}>
            <img src={ring} alt="" />
          </Link>
          <Link to="/login">
            <img src={arrow} alt="" />
          </Link>
        </>
      )}
    </header>
  );
};

export default DashboardNavbar;
