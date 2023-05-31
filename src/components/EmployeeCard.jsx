import React from "react";
import dots from "../assets/employees/dots.svg";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { motion } from "framer-motion";
import UserSvg from "./svgs/UserSvg";
import DotsSvg from "./svgs/DotsSvg";

const EmployeeCard = ({
  name,
  setCompirmationModalOpen,
  openModal,
  setAactiveEmployee,
  deleteEmployee,
}) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 1,
        },
      }}
      className="employee-card"
    >
      <div className="employee-card__img-container">
        <UserSvg />
      </div>

      <Menu
        direction="bottom"
        align="center"
        className="employee-card-menu"
        menuButton={({ open }) => (
          // <img
          //   onClick={() => setAactiveEmployee(name)}
          //   className={`employee-card__dots ${open ? "open" : ""}`}
          //   src={dots}
          //   alt=""
          // />
          <button
            onClick={() => setAactiveEmployee(name)}
            className={`employee-card__dots-btn ${open ? "open" : ""}`}
          >
            <DotsSvg />
          </button>
        )}
        transition
      >
        <MenuItem
          onClick={() => {
            openModal();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCompirmationModalOpen(true);
          }}
        >
          delete
        </MenuItem>
      </Menu>

      <h2>{name}</h2>
      <h3>Aadministrator</h3>
      <h4>Access:</h4>
      <ul>
        <li>2 Nabiji</li>
        <li>Spar</li>
        <li>Nikora</li>
        <li>Gvirila</li>
        <li>Fresco</li>
      </ul>
      <button className="btn btn-success" onClick={openModal}>
        Change
      </button>
    </motion.article>
  );
};

export default EmployeeCard;
