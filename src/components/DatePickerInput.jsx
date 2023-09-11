import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { addDays } from "date-fns";
import format from "date-fns/format";
import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "../styles/date-picker-input.css";
import VendorsCalendarSvg from "./svgs/VendorsCalendarSvg";

const DatePickerInput = () => {
  const [dateChanged, setDateChanged] = useState(false);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
      color: "#6E0FF5",
    },
  ]);

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
        <MenuButton className={` btn-date  date-picker-input  ${dateChanged ? "date-changed" : null}`}>
          <span className="svg-span">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M4.98062 17C2.04941 17 0 14.9131 0 11.9232V5.96768C0 2.95332 1.98252 0.915277 4.93805 0.890869H11.0194C13.9506 0.890869 16 2.97773 16 5.96768V11.9293C16 14.9009 13.9688 16.9817 11.0559 17H4.97453H4.98062ZM4.94413 2.41635C2.8339 2.43466 1.52033 3.78929 1.52033 5.96768V11.9232C1.52033 14.0772 2.87647 15.4745 4.98062 15.4745H11.0559C13.1357 15.4623 14.4797 14.0711 14.4797 11.9293V5.96768C14.4797 3.8137 13.1235 2.41635 11.0194 2.41635H4.94413Z"
              />
              <path
                d="M14.4311 7.77378H1.7211C1.30149 7.77378 0.960938 7.43207 0.960938 7.01103C0.960938 6.59 1.30149 6.24829 1.7211 6.24829H14.4311C14.8507 6.24829 15.1913 6.59 15.1913 7.01103C15.1913 7.43207 14.8507 7.77378 14.4311 7.77378Z"
              />
              <path
                d="M5.21818 4.64968C4.79856 4.64968 4.45801 4.30797 4.45801 3.88693V0.762742C4.45801 0.341709 4.79856 0 5.21818 0C5.63779 0 5.97834 0.341709 5.97834 0.762742V3.88693C5.97834 4.30797 5.63779 4.64968 5.21818 4.64968Z"
              />
              <path
                d="M10.8061 4.64968C10.3865 4.64968 10.0459 4.30797 10.0459 3.88693V0.762742C10.0459 0.341709 10.3865 0 10.8061 0C11.2257 0 11.5662 0.341709 11.5662 0.762742V3.88693C11.5662 4.30797 11.2257 4.64968 10.8061 4.64968Z"
              />
              <path
                d="M4.8469 9.45801H4.18404C3.95565 9.45801 3.77051 9.64378 3.77051 9.87294V10.5381C3.77051 10.7672 3.95565 10.953 4.18404 10.953H4.8469C5.07529 10.953 5.26044 10.7672 5.26044 10.5381V9.87294C5.26044 9.64378 5.07529 9.45801 4.8469 9.45801Z"
              />
              <path
                d="M4.8469 12.0574H4.18404C3.95565 12.0574 3.77051 12.2431 3.77051 12.4723V13.1374C3.77051 13.3666 3.95565 13.5523 4.18404 13.5523H4.8469C5.07529 13.5523 5.26044 13.3666 5.26044 13.1374V12.4723C5.26044 12.2431 5.07529 12.0574 4.8469 12.0574Z"
              />
              <path
                d="M12.4787 9.45801H11.8159C11.5875 9.45801 11.4023 9.64378 11.4023 9.87294V10.5381C11.4023 10.7672 11.5875 10.953 11.8159 10.953H12.4787C12.7071 10.953 12.8923 10.7672 12.8923 10.5381V9.87294C12.8923 9.64378 12.7071 9.45801 12.4787 9.45801Z"
              />
              <path
                d="M8.6594 9.45801H7.99654C7.76815 9.45801 7.58301 9.64378 7.58301 9.87294V10.5381C7.58301 10.7672 7.76815 10.953 7.99654 10.953H8.6594C8.88779 10.953 9.07294 10.7672 9.07294 10.5381V9.87294C9.07294 9.64378 8.88779 9.45801 8.6594 9.45801Z"
              />
              <path
                d="M8.6594 12.0574H7.99654C7.76815 12.0574 7.58301 12.2431 7.58301 12.4723V13.1374C7.58301 13.3666 7.76815 13.5523 7.99654 13.5523H8.6594C8.88779 13.5523 9.07294 13.3666 9.07294 13.1374V12.4723C9.07294 12.2431 8.88779 12.0574 8.6594 12.0574Z"
              />
            </svg>
          </span>
          <span className={`date-span  ${dateChanged ? "black": ""}`} >
            {dateChanged ? <>{resDate}</> : "ამოირჩიე პერიოდი"}
          </span>
        </MenuButton>
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

export default DatePickerInput;
