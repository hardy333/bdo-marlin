import React, { useEffect, useRef, useState } from "react";
// News Images
import marlinText from "../assets/navbar/marlin-text.svg";


import { Link, NavLink } from "react-router-dom";
import { AsideBtnSvg, CatalogSvg, ContractSvg, EmployeesSvg, InvoicesSvg, OrdersSvg, ReportsSvg, RetroBonusSvg, SettingsSvg, TermsAndServicesSvg, VendorsSvg } from "./svgs/SidebarIcons";

const DashboardAsideVendors = ({
  selected = false,
  left = true,
  responsive = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBodyClass = () => {
    if (document.body) {
      document.body.classList.toggle("body-sidebar-open");
    }
  };

  const linkListRef = useRef(null);

  useEffect(() => {
    const linkLabels = linkListRef.current.querySelectorAll(".aside-label");

    const handleTransitionEnd = () => {};

    linkLabels.forEach((linkLabel) => {
      linkLabel.addEventListener("transitionend", handleTransitionEnd);
    });

    return () => {
      linkLabels.forEach((linkLabel) => {
        linkLabel.removeEventListener("transitionend", handleTransitionEnd);
      });
    };
  }, []);

  const handleLinkClick = () => {
    // document.body.classList.add("body-sidebar-responsive-close");
    document.body.classList.remove("body-sidebar-open");
  };

  return (
    <aside
      className={`dashboard-aside ${!left ? "go-right" : ""} ${
        responsive ? "responsive" : ""
      }`}
    >
      <button onClick={toggleBodyClass} className="aside-btn">
        {/* <img src={asideBtn} alt="" /> */}
        <AsideBtnSvg />
      </button>
      <div className="dashboard-aside-container">
        <Link
          to="/"
          className="marlin-logo-container"
          onClick={handleLinkClick}
        >
          {/* <img draggable="false" className="logo-img" src={logo} alt="" /> */}
          <svg
            id="Layer_1"
            className="logo-img"
            viewBox="0 0 292.32 270.51"
            style={{ fill: "white" }}
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m292.32,135.24c0,2.61-2.04,4.72-4.6,4.85h-150.48c-.61-.02-1.21-.03-1.82-.03s-1.21,0-1.82.03c-25.1.74-46.35,16.8-54.74,39.15-2.48,6.6-3.83,13.74-3.83,21.21,0,32.84,26.2,59.54,58.83,60.37.52.01,1.04.02,1.56.02s1.04,0,1.56-.02c32.63-.83,58.83-27.53,58.83-60.37,0-5.1-.63-10.06-1.83-14.79-.01-.01-.01-.03-.01-.05-.06-.22-.11-.45-.17-.67-.01,0-.01-.02-.01-.03-.05-.26-.07-.53-.07-.81,0-2.68,2.17-4.86,4.86-4.86h57.95c2.57.13,4.61,2.24,4.61,4.84,0,.42-.05.82-.16,1.2.01.02,0,.03-.01.05-.15.39-.31.79-.48,1.18h0c-13.85,33.78-40.94,60.7-74.84,74.31-15.57,6.25-32.57,9.69-50.37,9.69s-34.79-3.44-50.36-9.69c-36.3-14.56-64.82-44.41-77.6-81.58C3.08,166.9.57,153.75.09,140.09c-.06-1.61-.09-3.23-.09-4.85s.03-3.24.09-4.85C2.61,58.87,60.65,1.48,132.43,0c2.13,0,3.93,1.37,4.58,3.28.05.84.11,1.69.18,2.53,5.45,68.97,62.57,123.4,132.66,124.58.2,0,.41,0,.61,0,.57.01,1.15.01,1.72.01.78,0,1.56-.01,2.33-.02h12.96c2.68,0,4.85,2.17,4.85,4.85Z"
            />
          </svg>
          <img
            draggable="false"
            className="marlin-text"
            src={marlinText}
            alt=""
          />
          {/* <span className="aside-label">Marlin</span> */}
        </Link>
        <div className="dashboard-aside__list-wrapper">
          <ul ref={linkListRef} className="dashboard-aside__list">
            <li onClick={handleLinkClick}>
              <NavLink
                to="/retailers"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img
                  className="dashboard-aside__list__vendor"
                  src={vendors}
                  alt=""
                /> */}
                <VendorsSvg />
                <span className="aside-label">რითეილერები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/vendor-all-orders-vendor"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={orders} alt="" /> */}
                <OrdersSvg />
                <span className="aside-label">შეკვეთები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/vendor-retro-bonuses"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={percentSvg} alt="" /> */}
                <RetroBonusSvg />
                <span className="aside-label">ბონუსები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/vendor-catalogue"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={catalog} alt="" /> */}
                <CatalogSvg />
                <span className="aside-label">კატალოგი</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/employees"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={employees} alt="" /> */}
                <EmployeesSvg />
                <span className="aside-label">თანამშრომლები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/invoices-table"
                className={({ isActive, isPending }) =>
                  selected
                    ? "active"
                    : isPending
                    ? "pending"
                    : isActive
                    ? "active"
                    : ""
                }
              >
                {/* <img src={invoices} alt="" /> */}
                <InvoicesSvg />
                <span className="aside-label">ინვოისები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/Reports"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={reportSvg} alt="" /> */}
                <ReportsSvg />
                <span className="aside-label">რეპორტები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick} className="aside-settings">
              <NavLink
                to="/logs"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={settings} alt="" /> */}
                <SettingsSvg />
                <span className="aside-label">სეთინგები</span>
              </NavLink>
            </li>
            {/*  */}
            <li onClick={handleLinkClick} className="aside-terms">
              <NavLink
                to="/terms"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={conditions} alt="" /> */}
                <TermsAndServicesSvg />
                <span className="aside-label">პირობები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick} className="aside-paper">
              <NavLink
                to="/contract"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {/* <img src={contract} alt="" /> */}
                <ContractSvg />
                <span className="aside-label">კონტრაქტი</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default DashboardAsideVendors;
