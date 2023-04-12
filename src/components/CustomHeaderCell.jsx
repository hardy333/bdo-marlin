import React, { useState } from "react";
import "../styles/custom-header-cell.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import dotsSvg from "../assets/employees/dots.svg";

const CustomHeaderCell = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="custom-header-cell-container">
      <span>{props.displayName}</span>
      <Menu
        // align="center"
        // direction="bottom"
        menuButton={
          <MenuButton>
            <img src={dotsSvg} alt="" />
          </MenuButton>
        }
        transition
      >
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>

      {/* <button>
        <img src={dotsSvg} alt="" />
        <div className="table-header-modal">
          <p>
            Lorem <br />
            ldkj <br />
            dkjd <br />
            jhf <br />
          </p>
        </div>
      </button> */}
    </div>
  );
};

export default CustomHeaderCell;
