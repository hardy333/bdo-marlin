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
    </Modal>
  );
};

export default EmployeesMainModal;
