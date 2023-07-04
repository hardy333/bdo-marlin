import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { Menu, MenuItem } from "@szhsin/react-menu";

const DatePickerBtn = ({ dateState, setDateState }) => {
  return (
    <Menu
      className="date-menu"
      menuButton={
        <button className="btn btn-date">
          {format(dateState[0].startDate, "MM.dd.yyyy")} -{" "}
          {format(dateState[0].endDate, "MM.dd.yyyy")}
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
          dragSelectionEnabled
          onChange={(item) => setDateState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateState}
          direction="horizontal"
          className="date-range-picker-one"
          anchor="start"
        />
      </MenuItem>
    </Menu>
  );
};

export default DatePickerBtn;
