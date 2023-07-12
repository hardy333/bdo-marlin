import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { Menu, MenuItem } from "@szhsin/react-menu";

const DatePickerBtn = ({
  dateState,
  datePicekerRef,
  dateChanged,
  setDateChanged,
  setDateState,
}) => {
  let resDate;
  let dateStart = format(dateState[0].startDate, "MM.dd.yyyy");
  let dateEnd = format(dateState[0].endDate, "MM.dd.yyyy");

  if (dateStart !== dateEnd) {
    resDate = dateStart + " - " + dateEnd;
  } else {
    resDate = dateStart;
  }

  return (
    <Menu
      className="date-menu"
      menuButton={
        <button className={`btn btn-date `} ref={datePicekerRef}>
          {dateChanged ? <>{resDate}</> : null}
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
          onChange={(item) => {
            setDateState([item.selection]);
            setDateChanged(true);
          }}
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
