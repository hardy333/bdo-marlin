import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import React, { useState } from "react";
import "../styles/header-cell-menu-2.css";
import dotsSvg2 from "../assets/dotsSvg2.svg";
const filterStates = [
  {
    label: "contains",
    value: "contains",
  },
  {
    label: "Equals",
    value: "equals",
  },
  {
    label: "Not Contains",
    value: "notContains",
  },
  {
    label: "Not equal",
    value: "notEqual",
  },
  {
    label: "Starts With",
    value: "startsWith",
  },
  {
    label: "Ends With",
    value: "endsWith",
  },
];

const numberFilterStates = [
  {
    label: "greaterThanOrEqual",
    value: "greaterThanOrEqual",
  },
];

const HeaderCellMenu2 = ({ p }) => {
  const [filterState, setFilterState] = useState(filterStates[0]);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = (e) => {
    const val = Number(e.target.value);
    setFilterValue(e.target.value);
    // p.onFloatingFilterChanged("contains", val);
    const x = p.onFloatingFilterChanged;

    const filterInsatnce = p.api.getFilterInstance(p.column.colId);

    console.log(val, typeof val);

    filterInsatnce.setModel({
      // filterType: "number",
      // type: "startsWith", // Works
      // type: "endsWith", // Works
      // type: "contains", // Works
      // type: "notContains", // Works
      // type: "equals", // Works
      // type: "notEquals",
      // type: "blank",
      // type: filterState.value,
      // type: "lessThan",
      // filter: val,

      filterType: "number",
      type: "lessThan",
      filter: val,
    });

    p.api.onFilterChanged();
  };

  // console.log(filterState)

  return (
    <>
      <Menu
        className="header-cell-menu-2 header-cell-menu"
        menuButton={
          <MenuButton className="header-cell-menu-button-2">
            <img src={dotsSvg2} alt="" />
          </MenuButton>
        }
        transition
        onItemClick={(e) => {
          e.keepOpen = true;
        }}
      >
        <header id="header-header-x">
          <button
            onClick={(e) => {
              if (e.target.tagName === "BUTTON" && open) {
                setOpen(false);
                return;
              }

              if (e.target.tagName !== "BUTTON") return;
              setOpen(true);
            }}
            className="header-cell-menu-2__child-menu-button filters-menu-btn"
          >
            {filterState.label}
            {open && (
              <ul className="">
                {filterStates.map((state) => {
                  return (
                    <li
                      key={state.label}
                      onClick={() => {
                        setFilterState(state);
                        setOpen(false);
                      }}
                    >
                      {state.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </button>

          <input
            type="text"
            value={filterValue}
            onChange={handleFilter}
            placeholder={
              filterState === "In range" ? "Min value" : "Filter input"
            }
          />
          {filterState === "In range" ? (
            <input type="number" placeholder="Max Value" />
          ) : null}
        </header>
        {/* <MenuItem>
          <input type="checkbox" id="select-all" />
          <label htmlFor="select-all">Select All</label>
        </MenuItem>
        <MenuItem>
          <input type="checkbox" id="0" />
          <label htmlFor="0">0</label>
        </MenuItem>
        <MenuItem>
          <input type="checkbox" id="12" />
          <label htmlFor="12">12</label>
        </MenuItem>
        <MenuItem>
          <input type="checkbox" id="124" />
          <label htmlFor="124">124</label>
        </MenuItem>
        <MenuItem>
          <input type="checkbox" id="168" />
          <label htmlFor="168">168</label>
        </MenuItem>
        <MenuItem>
          <input type="checkbox" id="1989" />
          <label htmlFor="1989">1989</label>
        </MenuItem> */}
      </Menu>
    </>
  );
};

export default HeaderCellMenu2;
