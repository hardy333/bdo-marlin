import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/icons/Marlin Logo.png";
// import catalog from "../assets/icons/menu-icons/catalog.png";
// import customer from "../assets/icons/menu-icons/customer.png";
// import invoice from "../assets/icons/menu-icons/invoice.png";
// import paper from "../assets/icons/menu-icons/paper.png";
// import settings from "../assets/icons/menu-icons/settings.png";
// import shoppingbag from "../assets/icons/menu-icons/shopping-bag.png";
// import team from "../assets/icons/menu-icons/team-management.png";
// import terms from "../assets/icons/menu-icons/terms-and-conditions.png";

// News Images
import carPink from "../assets/navbar/car-pink.svg";
import catalog from "../assets/navbar/catalog.svg";
import conditions from "../assets/navbar/conditions.svg";
import contract from "../assets/navbar/contract.svg";
import employees from "../assets/navbar/employees.svg";
import invoices from "../assets/navbar/invoices.svg";
import orders from "../assets/navbar/orders.svg";
import settings from "../assets/navbar/s.svg";
import vendors from "../assets/navbar/vendors.svg";
import togoText from "../assets/navbar/marlin-logo-with-text.svg";
import marlinText from "../assets/navbar/marlin-text.svg";
import { Link, NavLink } from "react-router-dom";
import asideBtn from "../assets/aside-btn.svg";
import reportSvg from "../assets/reports.svg";

const DashboardAside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBodyClass = () => {
    if (document.body) {
      document.body.classList.toggle("body-sidebar-open");
    }
  };

  const linkListRef = useRef(null);

  // useEffect(() => {

  //   const asideSapns = document.querySelectorAll(".dashboard-aside__list a span")

  //   const hideSpan = (span) => {
  //     if(!document.body.classList.contains("body-sidebar-open")){
  //       span.style.display = "none"
  //     }
  //   }

  //   asideSapns.forEach(span => {
  //     span.addEventListener("transitionend", () => hideSpan(span))
  //   })

  //   return () => {
  //     asideSapns.forEach(span => {
  //       span.removeEventListener("transitionend", () => hideSpan(span))
  //     })
  //   }
  // }, [])

  useEffect(() => {
    const linkLabels = linkListRef.current.querySelectorAll(".aside-label");

    const handleTransitionEnd = () => {
      // console.log(linkLabel, "Transition end ");
    };

    linkLabels.forEach((linkLabel) => {
      linkLabel.addEventListener("transitionend", handleTransitionEnd);
    });

    return () => {
      linkLabels.forEach((linkLabel) => {
        linkLabel.removeEventListener("transitionend", handleTransitionEnd);
      });
    };
  }, []);

  return (
    <aside className="dashboard-aside">
      <button onClick={toggleBodyClass} className="aside-btn">
        <img src={asideBtn} alt="" />
      </button>
      <div className="dashboard-aside-container">
        <Link to="/" className="marlin-logo-container">
          <img draggable="false" className="logo-img" src={logo} alt="" />
          <img
            draggable="false"
            className="marlin-text"
            src={marlinText}
            alt=""
          />
          {/* <span className="aside-label">Marlin</span> */}
        </Link>
        <ul ref={linkListRef} className="dashboard-aside__list">
          <li>
            <NavLink
              to="/vendors"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img
                className="dashboard-aside__list__vendor"
                src={vendors}
                alt=""
              />
              <span className="aside-label">მომწოდებლები</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-orders-parent"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={orders} alt="" />
              <span className="aside-label">შეკვეთები</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalogue"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={catalog} alt="" />
              <span className="aside-label">კატალოგი</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employees"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={employees} alt="" />
              <span className="aside-label">თანამშრომლები</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/invoices-table"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={invoices} alt="" />
              <span className="aside-label">ინვოისები</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Reports"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={reportSvg} alt="" />
              <span className="aside-label">რეპორტები</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logs"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={settings} alt="" />
              <span className="aside-label">სეთინგები</span>
            </NavLink>
          </li>
          {/*  */}
          <li className="aside-terms">
            <NavLink
              to="/terms"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={conditions} alt="" />
              <span className="aside-label">პირობები</span>
            </NavLink>
          </li>
          <li className="aside-paper">
            <NavLink
              to="/contract"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <img src={contract} alt="" />
              <span className="aside-label">კონტრაქტი</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardAside;
