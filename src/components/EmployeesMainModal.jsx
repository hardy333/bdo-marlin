import React from "react";
import Modal from "react-modal";
import CloseModalSvg from "../components/svgs/CloseModalSvg";
import PeopleSvg from "../components/svgs/PeopleSvg";
import PersonCheckSvg from "../components/svgs/PersonCheckSvg";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Tippy from "@tippyjs/react";
import EmployeeModalInfo from "./EmployeeModalInfo";

const EmployeesMainModal = ({ modalIsOpen, closeModal, setIsOpen }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      className="employees-modal employees-modal-x"
      overlayClassName="employees-modal-overlay"
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      <button onClick={() => setIsOpen(false)} className="vendors-modal__btn ">
        <CloseModalSvg />
      </button>
      <div className="left">
        <h2>მოიწვიე კოლეგები და იმუშავე მათთან ერთად</h2>
        <input type="text" placeholder="სახელი" />
        <input type="text" placeholder="გვარი" />
        <input type="text" placeholder="იმეილი" />
        <div className="role-input-wrapper">
          <input type="text" placeholder="როლი" className="role-input" />

          <Tippy
            className="employee-modal-tooltip"
            arrow={false}
            placement="top"
            content={<EmployeeModalInfo />}
          >
            <span className="role-input-icon">
              <IoIosInformationCircleOutline />
            </span>
          </Tippy>
        </div>
        <input type="text" placeholder="წვდომა" />
        <button className="btn ">დაამატე კოლეგა</button>
      </div>
      <div className="right">
        {/* 1 */}
        <div className="list-box">
          <div className="img-circle">
            {/* <img src={personsImg} alt="" /> */}
            <PeopleSvg />
          </div>
          <h2>Administrator</h2>
          <ul>
            <li>
              <PersonCheckSvg />
              <span>store's performance</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Staff management</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Handling customers</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Collaborating with other</span>
            </li>
          </ul>
        </div>
        {/* 2 */}
        <div className="list-box">
          <div className="img-circle">
            <PeopleSvg />
            {/* <img src={personsImg} alt="" /> */}
          </div>
          <h2>Analyticos</h2>
          <ul>
            <li>
              <PersonCheckSvg />
              <span>Managing stock levels</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Conducting regular stock</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Analyzing sales </span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Analyzing prices</span>
            </li>
          </ul>
        </div>
        {/* 3 */}
        <div className="list-box">
          <div className="img-circle">
            {/* <img src={personsImg} alt="" /> */}
            <PeopleSvg />
          </div>
          <h2>store Manager</h2>
          <ul>
            <li>
              <PersonCheckSvg />
              <span>Implementing and maintaining</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>ollaborating, marketing</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Updating signage and pricing</span>
            </li>
            <li>
              <PersonCheckSvg />
              <span>Monitoring and replenishing</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeesMainModal;
