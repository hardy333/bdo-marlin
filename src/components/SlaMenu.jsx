import React, { useState } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";
import ItemSvg from "./svgs/service-level-svgs/ItemSvg";
import CategorySvg from "./svgs/service-level-svgs/CategorySvg";
import BrandSvg from "./svgs/service-level-svgs/BrandSvg";
import RegionSvg from "./svgs/service-level-svgs/RegionSvg";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import CarSvg from "./svgs/service-level-svgs/CarSvg";

const itemsList = [
  {
    svg: <HouseSvg />,
    label: "მაღაზიებით",
    pathname: "/sla-by-shops"
  },
  {
    svg: <ItemSvg />,
    label: "პროდუქტებით",
    pathname: "/sla-by-item"

  },
  {
    svg: <CategorySvg />,
    label: "კატეგორიებით",
    pathname: "/sla-by-category"

  },
  {
    svg: <BrandSvg />,
    label: "შეკვეთებით",
    pathname: "/sla-by-orders"
  },
  {
    svg: <CarSvg />,
    label: "მომწოდებლებით",
    pathname: "/Reports"
  },
];

const SlaMenu = ({ }) => {
  const {pathname} = useLocation()
  const [reportCategory, setReportCategory] = useState(() => itemsList.find(obj => obj.pathname === pathname) || itemsList[0]);
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        className="report-child-menu"
        menuButton={({ open }) => (
          <button className={`report-child-menu-button ${open ? "open" : ""}`}>
            {reportCategory.svg} {reportCategory.label}
            <svg
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="report-child-menu-arrow"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </button>
        )}
      >
        {itemsList.map((item) => {
          return (
            <MenuItem
              key={item.label}
              className={classNames({
                selected: reportCategory.label === item.label,
              })}
              onClick={() => {

                console.log(item.pathname)
                navigate(item.pathname)
              }}
            >
              {item.svg} {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default SlaMenu;
