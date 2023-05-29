import React from "react";
import Modal from "react-modal";
import CloseModalSvg from "../components/svgs/CloseModalSvg";
import PeopleSvg from "../components/svgs/PeopleSvg";
import PersonCheckSvg from "../components/svgs/PersonCheckSvg";

const EmployeesMainModal = ({ modalIsOpen, closeModal, setIsOpen }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      className="employees-modal employees-modal-x"
      overlayClassName="employees-modal-overlay"
      closeTimeoutMS={300}
    >
      <button onClick={() => setIsOpen(false)} className="vendors-modal__btn ">
        <CloseModalSvg />
      </button>
      <div className="left">
        <h2>Invite colleagues to work with you</h2>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="Role" />
        <input type="text" placeholder="Access Objects" />
        <button className="btn ">Add Collegue</button>
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
          <h2>Analyst</h2>
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
          <h2>Shop Manager</h2>
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
