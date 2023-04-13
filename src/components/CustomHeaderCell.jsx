import React, { useState } from "react";
import "../styles/custom-header-cell.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import dotsSvg from "../assets/employees/dots.svg";
import downIcon from "../assets/marlin-icons/down-arrow.png";
import classNames from "classnames";

const CustomHeaderCell = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sortingState, setSortingState] = useState(["none", "asc", "desc"]);
  const [sortingStateIndex, setSortingStateIndex] = useState(0);

  const handleSorting = () => {
    // disableAllColumnsSorting();

    let newIndex = sortingStateIndex + 1;
    if (sortingStateIndex >= sortingState.length - 1) {
      newIndex = 0;
    }

    setSortingStateIndex(newIndex);

    const currSortingState = sortingState[newIndex];

    if (currSortingState === null) {
      props.columnApi.applyColumnState({
        defaultState: { sort: null },
      });
    } else {
      props.columnApi.applyColumnState({
        state: [{ colId: props.column.colId, sort: currSortingState }],
        defaultState: { sort: null },
      });
    }
  };

  const disableAllColumnsSorting = () => {
    document
      .querySelectorAll(".custom-header-cell-container")
      .forEach((hCell) => {
        hCell.classList.remove("asc");
        hCell.classList.remove("desc");
      });
  };

  return (
    <div
      className={classNames({
        "custom-header-cell-container": true,
        asc: sortingState[sortingStateIndex] === "asc",
        desc: sortingState[sortingStateIndex] === "desc",
      })}
    >
      <span onClick={handleSorting}>
        {props.displayName}
        <img src={downIcon} className="heading-sorting-arrow-img" alt="" />
      </span>
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
