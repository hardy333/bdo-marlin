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
        className="employees-modal "
        overlayClassName="employees-modal-overlay"
        closeTimeoutMS={300}
      >
        <h2>Add New Employee</h2>
        <input type="text" placeholder="Employee Name" />
        <input type="text" placeholder="Employee Age" />
        <button
          onClick={() => {
            closeModal();
            notify();
          }}
          className="btn btn-success"
        >
          Add{" "}
        </button>
        <small>By clicking Sign up, you agree to the terms of use.</small>
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
