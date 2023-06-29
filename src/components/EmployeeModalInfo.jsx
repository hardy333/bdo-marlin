import React from "react";
import PeopleSvg from "../components/svgs/PeopleSvg";
import PersonCheckSvg from "../components/svgs/PersonCheckSvg";

const EmployeeModalInfo = () => {
  return (
    <div className="right">
      {/* 1 */}
      <div className="list-box">
        <div className="img-circle">
          {/* <img src={personsImg} alt="" /> */}
          <PeopleSvg />
        </div>
        <h2>ადმინისტრატორი</h2>
        <ul>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
        </ul>
      </div>
      {/* 2 */}
      <div className="list-box">
        <div className="img-circle">
          <PeopleSvg />
          {/* <img src={personsImg} alt="" /> */}
        </div>
        <h2>ანალიტიკოსი</h2>
        <ul>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
        </ul>
      </div>
      {/* 3 */}
      <div className="list-box">
        <div className="img-circle">
          {/* <img src={personsImg} alt="" /> */}
          <PeopleSvg />
        </div>
        <h2>მაღაზიის მენეჯერი</h2>
        <ul>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
          <li>
            <PersonCheckSvg />
            <span>Blaa bla bla bla</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeModalInfo;
