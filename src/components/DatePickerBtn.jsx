import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const DatePickerBtn = ({ dateState, setDateState }) => {
  return (
    <Menu
      className="date-menu"
      menuButton={
        <button className="btn btn-date">
          {format(dateState[0].startDate, "MMM dd, yyyy")} -{" "}
          {format(dateState[0].endDate, "MMM dd, yyyy")}
        </button>
      }
      transition
    >
      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DateRangePicker
          onChange={(item) => setDateState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateState}
          direction="horizontal"
        />
      </MenuItem>
    </Menu>
  );
};

export default DatePickerBtn;
