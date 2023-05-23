import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/employees.css";
import EmployeeCard from "../components/EmployeeCard";
import searchSvg from "../assets/employees/search.svg";
import searchSvg2 from "../assets/marlin-icons/search.svg";
import ExpandingInput from "../components/ExpandingInput";
import PlusSvg from "../components/svgs/PlusSvg";
import SearchSvg from "../components/svgs/SearchSvg";
import Modal from "react-modal";
import "../styles/employees-modal-x.css";

import personCheckImg from "../assets/persons-check.png";
import personsImg from "../assets/persons.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PeopleSvg from "../components/svgs/PeopleSvg";
import PersonCheckSvg from "../components/svgs/PersonCheckSvg";

const Employees = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const notify = () => toast.success("New Employee was added !");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <DashboardLayout>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        className="employees-modal employees-modal-x"
        overlayClassName="employees-modal-overlay"
        closeTimeoutMS={300}
      >
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
            <h2>Analist</h2>
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

      <header className="employees-header">
        <div className="employees-settings">
          <h1>Employees</h1>
          <button onClick={openModal} className="btn btn-outlined btn-black ">
            <PlusSvg fill="#211543" />
            Add
          </button>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </div>
      </header>

      <div className="employees-card-container">
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>
      <div className="employee-pag-container">
        <button>&larr;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&rarr;</button>

        <div className="employees-page-info">
          <p>1-5 of 5</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Employees;
