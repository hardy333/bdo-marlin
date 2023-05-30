import React from "react";
import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/employees.css";
import EmployeeCard from "../components/EmployeeCard";
import ExpandingInput from "../components/ExpandingInput";
import PlusSvg from "../components/svgs/PlusSvg";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/employees-modal-x.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeesCompirmationModal from "../components/svgs/EmployeesCompirmationModal";
import EmployeesMainModal from "../components/EmployeesMainModal";
import { AnimatePresence, LayoutGroup } from "framer-motion";

const namesArr = [
  "Daniel Pataraia",
  "Daniel Alasania",
  "Petre Bolkvadze",
  "Nikoloz Zakariadze",
  "Luka Zibzibadze",
  "Bidzina Toreli",
  "Vakhtang Dadiani",
  "Zviadi Abakelia",
  "Ramazi Tavdgiridze",
  "Korneli Chiaureli",
  "Otar Khujadze",
  "Davit Sakandelidze",
  "Zaal Mkheidze",
  "Stepane Ochiauri",
  "Andria Zviadadze",
  "Iona Gakharia",
];

const Employees = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [compirmationModalOpen, setCompirmationModalOpen] = useState(false);
  const [employeesArr, setEmployeesArr] = useState(namesArr);
  const [activeEmployee, setAactiveEmployee] = useState(null);

  const notify = () => toast.success("New Employee was added !");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const delteEmployee = (name) => {
    setEmployeesArr(employeesArr.filter((currName) => currName !== name));
  };

  console.log(activeEmployee);

  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <EmployeesCompirmationModal
        compirmationModalOpen={compirmationModalOpen}
        setCompirmationModalOpen={setCompirmationModalOpen}
        activeEmployee={activeEmployee}
        delteEmployee={delteEmployee}
      />
      <EmployeesMainModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setIsOpen={setIsOpen}
      />

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
        <LayoutGroup>
          {employeesArr.map((name) => {
            return (
              <EmployeeCard
                openModal={openModal}
                key={name}
                name={name}
                setAactiveEmployee={setAactiveEmployee}
                setCompirmationModalOpen={setCompirmationModalOpen}
                delteEmployee={delteEmployee}
              />
            );
          })}
        </LayoutGroup>
      </div>
      <div className="employee-pag-container">
        <button>&larr;</button>
        <button className="active">1</button>
        <button>&rarr;</button>

        <div className="employees-page-info">
          <p>
            1-{employeesArr.length} of {employeesArr.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Employees;
