import React from "react";
import user from "../assets/employees/user.svg";
import dots from "../assets/employees/dots.svg";
import userCircle from "../assets/marlin-icons/purple-user.svg";
import { Menu, MenuItem } from "@szhsin/react-menu";

const EmployeeCard = () => {
  return (
    <article className="employee-card">
      <div className="employee-card__img-container">
        {/* <img src={userCircle} className="employee-card__img" alt="" /> */}

        <svg
          className="employee-card__img"
          id="Layer_3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
        >
          <defs></defs>
          <circle className="cls-3" fill="#6e0ff5" cx="30" cy="30" r="30" />
          <g className="cls-2">
            <path
              className="cls-1"
              fill="#fff"
              d="m46.43,40.71v2.29c0,3.57-2.89,6.46-6.46,6.46h-19.94c-3.57,0-6.46-2.89-6.46-6.46v-2.29c0-3.91,1.74-7.42,4.49-9.78,1.31-1.13,3.23-1.07,4.58.02,2.01,1.63,4.57,2.6,7.36,2.6s5.35-.97,7.36-2.6c1.35-1.09,3.26-1.14,4.58-.02,2.75,2.36,4.49,5.86,4.49,9.77Z"
            />
            <path
              className="cls-1"
              fill="#fff"
              d="m39.59,19.9c0,2.71-1.13,5.16-2.94,6.9-1.72,1.67-4.07,2.69-6.66,2.69s-4.93-1.03-6.65-2.69c-1.82-1.74-2.95-4.19-2.95-6.9,0-5.29,4.31-9.6,9.6-9.6s9.6,4.3,9.6,9.6Z"
            />
          </g>
        </svg>
      </div>

      <Menu
        direction="bottom"
        align="center"
        className="employee-card-menu"
        menuButton={<img className="employee-card__dots" src={dots} alt="" />}
        transition
      >
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
      </Menu>

      <h2>Mariam Mamulia</h2>
      <h3>Aadministrator</h3>
      <h4>Access:</h4>
      <ul>
        <li>2 Nabiji</li>
        <li>Spar</li>
        <li>Nikora</li>
        <li>Gvirila</li>
        <li>Fresco</li>
      </ul>
      <button className="btn btn-success">Change</button>
    </article>
  );
};

export default EmployeeCard;
