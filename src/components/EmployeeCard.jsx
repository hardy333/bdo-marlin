import React from "react";
import user from "../assets/employees/user.svg";
import dots from "../assets/employees/dots.svg";
import userCircle from "../assets/marlin-icons/purple-user.svg";

console.log(userCircle);

const EmployeeCard = () => {
  return (
    <article className="employee-card">
      <div className="employee-card__img-container">
        <img src={userCircle} className="employee-card__img" alt="" />
      </div>
      <img className="employee-card__dots" src={dots} alt="" />

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
