import React from "react";
import gdm from "../assets/icons/gdm.png";
// import ring from "../assets/icons/ringing.png";
// import signOut from "../assets/icons/sign-out.png";

import arrow from "../assets/navbar/arrow.svg";
import ring from "../assets/navbar/ring.svg";
import user from "../assets/navbar/user.svg";

const DashboardNavbar = () => {
  return (
    <header className="dashboard-navbar">
      <div className="gdm-container">
        <a href="#" >
         <img src={user} alt="" />
        </a>
        <span>GDM</span>
      </div>

      <a href="#">
        <img src={ring} alt="" />
      </a>
      <a href="#">
        <img src={arrow} alt="" />
      </a>
    </header>
  );
};

export default DashboardNavbar;
