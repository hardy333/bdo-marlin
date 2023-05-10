import React, { useState } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";
import ItemSvg from "./svgs/service-level-svgs/ItemSvg";
import CategorySvg from "./svgs/service-level-svgs/CategorySvg";
import BrandSvg from "./svgs/service-level-svgs/BrandSvg";
import RegionSvg from "./svgs/service-level-svgs/RegionSvg";
import arrowDown from "../assets/arrow-down.svg";
import classNames from "classnames";

const ItemsMenu = () => {
  const [reportCategory, setReportCategory] = useState("shop");

  return (
    <Menu
      className="report-child-menu"
      menuButton={
        <button className="report-child-menu-button">
          <img src={arrowDown} alt="" />
        </button>
      }
      transition
    >
      <MenuItem
        className={classNames({
          selected: reportCategory === "shop",
        })}
        onClick={() => {
          setReportCategory("shop");
        }}
      >
        <HouseSvg />
        Shop
      </MenuItem>
      <MenuItem
        className={classNames({
          selected: reportCategory === "item",
        })}
        onClick={() => {
          setReportCategory("item");
        }}
      >
        <ItemSvg />
        Item
      </MenuItem>
      <MenuItem
        className={classNames({
          selected: reportCategory === "category",
        })}
        onClick={() => {
          setReportCategory("category");
        }}
      >
        <CategorySvg />
        Category
      </MenuItem>
      <MenuItem
        className={classNames({
          selected: reportCategory === "brand",
        })}
        onClick={() => {
          setReportCategory("brand");
        }}
      >
        <BrandSvg />
        Brand
      </MenuItem>
      <MenuItem
        className={classNames({
          selected: reportCategory === "region",
        })}
        onClick={() => {
          setReportCategory("region");
        }}
      >
        <RegionSvg />
        Region
      </MenuItem>
    </Menu>
  );
};

export default ItemsMenu;
