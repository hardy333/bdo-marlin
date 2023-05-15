import React, { useState } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";
import ItemSvg from "./svgs/service-level-svgs/ItemSvg";
import CategorySvg from "./svgs/service-level-svgs/CategorySvg";
import BrandSvg from "./svgs/service-level-svgs/BrandSvg";
import RegionSvg from "./svgs/service-level-svgs/RegionSvg";
import arrowDown from "../assets/arrow-down.svg";
import classNames from "classnames";

const itemsList = [
  {
    svg: <HouseSvg />,
    label: "Shop",
  },
  {
    svg: <ItemSvg />,
    label: "Item",
  },
  {
    svg: <CategorySvg />,
    label: "Category",
  },
  {
    svg: <BrandSvg />,
    label: "Brand",
  },
  {
    label: "Region",
    svg: <RegionSvg />,
  },
];

const ItemsMenu = () => {
  const [reportCategory, setReportCategory] = useState(itemsList[0]);

  return (
    <div>
      <Menu
        className="report-child-menu"
        menuButton={
          <button className="report-child-menu-button">
            {reportCategory.svg} {reportCategory.label}
          </button>
        }
        transition
      >
        {itemsList.map((item) => {
          return (
            <MenuItem
              key={item.label}
              className={classNames({
                selected: reportCategory.label === item.label,
              })}
              onClick={() => {
                setReportCategory(item);
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

export default ItemsMenu;
