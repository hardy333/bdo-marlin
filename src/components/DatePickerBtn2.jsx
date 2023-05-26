import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import { Menu, MenuItem } from "@szhsin/react-menu";

const DatePickerBtn2 = ({ dateState, setDateState }) => {
  return (
    <Menu
      className="date-menu"
      menuButton={
        <button className="btn btn-date">
          {format(dateState["selection"].startDate, "MMM dd, yyyy")} -{" "}
          {format(dateState["selection"].endDate, "MMM dd, yyyy")}
        </button>
      }
      placement="start"
      transition
    >
      {/* <MenuItem onClick={(e) => {}}> */}
      <DateRangePicker
        onChange={(item) => setDateState({ ...dateState, ...item })}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={[dateState.selection, dateState.compare]}
        direction="horizontal"
      />
      {/* </MenuItem> */}
    </Menu>
  );
};

export default DatePickerBtn2;
