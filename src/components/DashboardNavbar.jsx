import React from "react";
import gdm from "../assets/icons/gdm.png";
import ring from "../assets/icons/ringing.png";
import signOut from "../assets/icons/sign-out.png";
// import user from "../assets/icons/user.svg";

const DashboardNavbar = () => {
  return (
    <header className="dashboard-navbar">
      <div className="gdm-container">
        <a href="#" className="gdm-link">
          <svg
            className="gdm"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </a>
        <span>GDM</span>
      </div>

      <a href="#">
        <img src={ring} alt="" />
      </a>
      <a href="#">
        <img src={signOut} alt="" />
      </a>
    </header>
  );
};

export default DashboardNavbar;
