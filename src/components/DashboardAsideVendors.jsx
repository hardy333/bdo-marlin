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
                {/* <VendorsSvg /> */}
                <RetailersSvg />
                <span className="aside-label">რითეილერები</span>
              </NavLink>
            </li>
            <li onClick={handleLinkClick}>
              <NavLink
                to="/all-orders-parent"
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
                to="/vendor-invoices"
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



const RetailersSvg = () => {
    return (
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 49.32">
  <g opacity=".8">
    <path d="m46.18,23.95v13.84c0,5.4-4.37,9.77-9.78,9.77h-5.8v-11.86c0-1.18-.75-2.19-1.81-2.56-.06-.03-.12-.05-.17-.07-.24-.07-.48-.11-.74-.11h-6.72c-1.5,0-2.73,1.22-2.73,2.73v11.86h-5.81c-5.39,0-9.76-4.37-9.76-9.77v-13.84c1.62,1.13,3.58,1.76,5.6,1.76,3.17,0,6.01-1.51,7.78-3.87,1.76,2.35,4.58,3.87,7.75,3.87h1.03c1.05,0,2.06-.16,3.01-.46t.02,0c1.9-.63,3.56-1.81,4.74-3.38,0,0,.02.02.02.03,1.11,1.45,2.6,2.56,4.33,3.21.74.28,1.52.46,2.33.56.36.04.72.06,1.1.06,2.01,0,3.97-.64,5.6-1.76Z" fill="#fff" stroke-width="0"/>
    <path d="m24,22.39h1.03c1.39,0,2.68-.44,3.73-1.2,1.05-.75,1.86-1.8,2.3-3.03-.17-.71-.26-1.44-.26-2.2V0h-12.59v15.96c0,.75-.09,1.49-.26,2.19.9,2.47,3.26,4.24,6.03,4.24Z" fill="#fff" stroke-width="0"/>
    <path d="m3.65,20.22c1.22,1.38,2.97,2.16,4.81,2.16,2.77,0,5.14-1.76,6.03-4.24.26-.68.39-1.42.39-2.19V0h-6.35c-1.97,0-3.68,1.4-4.07,3.33l-2.4,11.93c-.14,1.34.13,2.67.78,3.83.22.41.49.79.8,1.14Z" fill="#fff" stroke-width="0"/>
    <path d="m46.18,19.08c-.22.41-.49.79-.81,1.15-1.22,1.38-2.97,2.16-4.8,2.16-.36,0-.71-.03-1.07-.09-.85-.14-1.65-.47-2.35-.92-1.19-.76-2.12-1.88-2.6-3.22-.27-.68-.41-1.42-.41-2.2V0h6.35c1.97,0,3.68,1.4,4.06,3.33l1.85,9.14.28,1.39.28,1.4c.14,1.34-.14,2.67-.78,3.82Z" fill="#fff" stroke-width="0"/>
  </g>
  <path d="m57.96,40.85v2.21c0,3.46-2.81,6.26-6.26,6.26h-19.32c-3.46,0-6.26-2.81-6.26-6.26v-2.21c0-2.91.99-5.59,2.67-7.71,1.06.37,1.81,1.38,1.81,2.56v11.86h5.8c5.41,0,9.78-4.37,9.78-9.77v-4.66c1.09-.42,2.1-1.01,2.99-1.74,1.3-1.05,3.16-1.11,4.44-.02,2.66,2.3,4.36,5.69,4.36,9.48Z" fill="#6e0ff5" opacity=".77" stroke-width="0"/>
  <path d="m46.18,33.13v4.66c0,5.4-4.37,9.77-9.78,9.77h-5.8v-11.86c0-1.18-.75-2.19-1.81-2.56.5-.64,1.07-1.23,1.69-1.76,1.27-1.09,3.12-1.04,4.44.02,1.94,1.58,4.43,2.52,7.13,2.52,1.46,0,2.85-.28,4.14-.78Z" fill="#6e0ff5" opacity=".58" stroke-width="0"/>
  <path d="m51.34,20.69c0,2.62-1.09,5-2.84,6.68-.68.66-1.46,1.22-2.31,1.64v-5.06c-1.63,1.13-3.6,1.76-5.6,1.76-.38,0-.74-.02-1.1-.06-.81-.1-1.59-.28-2.33-.56-1.73-.66-3.22-1.76-4.33-3.21-.05-.4-.08-.79-.08-1.2,0-1.79.51-3.47,1.4-4.9v.17c0,.78.14,1.52.41,2.2.48,1.34,1.42,2.46,2.6,3.22.7.44,1.5.77,2.35.92.36.06.71.09,1.07.09,1.83,0,3.59-.78,4.8-2.16.32-.36.59-.73.81-1.15.65-1.15.93-2.48.78-3.82l-.28-1.4-.28-1.39c2.94,1.56,4.94,4.66,4.94,8.22Z" fill="#6e0ff5" opacity=".77" stroke-width="0"/>
  <path d="m40.58,25.71c2.01,0,3.97-.64,5.6-1.76v5.06c-1.25.63-2.65.97-4.14.97-2.51,0-4.78-.99-6.45-2.61-1.49-1.43-2.5-3.35-2.78-5.49,1.11,1.45,2.6,2.56,4.33,3.21.74.28,1.52.46,2.33.56.36.04.72.06,1.1.06Z" fill="#6e0ff5" opacity=".58" stroke-width="0"/>
  <path d="m46.18,19.08c-.22.41-.49.79-.81,1.15-1.22,1.38-2.97,2.16-4.8,2.16-.36,0-.71-.03-1.07-.09-.85-.14-1.65-.47-2.35-.92-1.19-.76-2.12-1.88-2.6-3.22-.27-.68-.41-1.42-.41-2.2v-.17c1.64-2.64,4.57-4.41,7.91-4.41,1.57,0,3.06.4,4.36,1.09l.28,1.39.28,1.4c.14,1.34-.14,2.67-.78,3.82Z" fill="#6e0ff5" opacity=".58" stroke-width="0"/>
</svg>
    )
}