import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/employees.css";
import EmployeeCard from "../components/EmployeeCard";
import searchSvg from "../assets/employees/search.svg";
import plusSvg from "../assets/employees/plus.svg";

const Employees = () => {
  return (
    <DashboardLayout>
      <header className="employees-header">
        <h1>Employees</h1>
        <div className="employees-settings">
          <button className="btn btn-outlined btn-black">
            <img src={plusSvg} alt="" />
            Add
          </button>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <img src={searchSvg} alt="" />
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
      </div>
    </DashboardLayout>
  );
};

export default Employees;
