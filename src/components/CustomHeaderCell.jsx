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
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              // state: [{ colId: props.displayName, sort: "desc" }],
              defaultState: { sort: null },
            });
          }}
        >
          <img src="" alt="" /> Clear Sort
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              state: [{ colId: props.column.colId, sort: "desc" }],
              defaultState: { sort: null },
            });
          }}
        >
          Sort by descending
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              state: [{ colId: props.column.colId, sort: "asc" }],
              defaultState: { sort: null },
            });
          }}
        >
          Sort by ascending
        </MenuItem>
        <MenuItem>Clear filter</MenuItem>
        <MenuItem>Filter By Status</MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.setColumnVisible(props.column.colId, false);
          }}
        >
          Hide {props.displayName} column
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.getColumns().forEach((column) => {
              props.columnApi.setColumnVisible(column.colId, true);
            });
          }}
        >
          Show All Columns
        </MenuItem>
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
