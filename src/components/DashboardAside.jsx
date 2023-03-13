import React from "react";
import logo from "../assets/icons/Marlin Logo.png";
import catalog from "../assets/icons/menu-icons/catalog.png";
import customer from "../assets/icons/menu-icons/customer.png";
import invoice from "../assets/icons/menu-icons/invoice.png";
import paper from "../assets/icons/menu-icons/paper.png";
import settings from "../assets/icons/menu-icons/settings.png";
import shoppingbag from "../assets/icons/menu-icons/shopping-bag.png";
import team from "../assets/icons/menu-icons/team-management.png";
import terms from "../assets/icons/menu-icons/terms-and-conditions.png";

const DashboardAside = () => {
  return (
    <aside className="dashboard-aside">
      <a href="">
        <img className="logo" src={logo} alt="" />
      </a>
      <ul className="dashboard-aside__list">
        <li>
          <a href="#">
            <img src={customer} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={shoppingbag} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={catalog} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={team} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={invoice} alt="" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={settings} alt="" />
          </a>
        </li>
        {/*  */}
        <li className="aside-terms">
          <a href="#">
            <img src={terms} alt="" />
          </a>
        </li>
        <li className="aside-paper">
          <a href="#">
            <img src={paper} alt="" />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default DashboardAside;
