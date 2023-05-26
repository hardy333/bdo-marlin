import React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const DatePickerBtn2 = ({
  dateState,
  setDateState,
  changeAllData,
  changeDataA,
  changeDataB,
  changeDemands,
}) => {
  useEffect(() => {
    const cont = document.querySelector(".rdrDefinedRangesWrapper");
    if (!cont) {
      console.log("No Cont");
      return;
    }

    createPortal(
      <div className="pag-container">
        <h2>Hello 3443</h2>
        <h2>Hello 43342</h2>
        <p>Lorem lorem </p>
      </div>,
      cont
    );
  }, []);

  const render = () => {
    const cont = document.querySelector(".rdrDefinedRangesWrapper");
    if (!cont) {
      console.log("No Cont");
      return;
    }

    console.log("Hhellod 12 12");

    createPortal(
      <div className="date-box">
        <h2>Hello 3443</h2>
        <h2>Hello 43342</h2>
        <p>Lorem lorem </p>
      </div>,
      cont
    );
  };

  return (
    <Menu
      className="date-menu"
      menuButton={({ open }) => {
        if (open) {
          render();
        }

        return (
          <button className="btn btn-date">
            <span style={{ color: "#F55364" }}>
              {format(dateState["selection"].startDate, "MMM dd, yyyy")} -{" "}
              {format(dateState["selection"].endDate, "MMM dd, yyyy")}
            </span>
            --
            <span style={{ color: "#6E0FF5" }}>
              {format(dateState["compare"].startDate, "MMM dd, yyyy")} -{" "}
              {format(dateState["compare"].endDate, "MMM dd, yyyy")}
            </span>
          </button>
        );
      }}
      placement="start"
      transition
    >
      <div className="date-box">
        <p className="red">Choose Perios:</p>
        <p className="blue">Compare: </p>
        <p></p>
      </div>
      <DateRangePicker
        dragSelectionEnabled
        onChange={(item) => {
          setDateState({ ...dateState, ...item });
          changeDemands();
          if (item.compare) {
            changeDataA();
          } else {
            changeDataB();
          }
        }}
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
