import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/employees.css";
import EmployeeCard from "../components/EmployeeCard";
import searchSvg from "../assets/employees/search.svg";
import searchSvg2 from "../assets/marlin-icons/search.svg";
import ExpandingInput from "../components/ExpandingInput";
import PlusSvg from "../components/svgs/PlusSvg";
import SearchSvg from "../components/svgs/SearchSvg";

const Employees = () => {
  return (
    <DashboardLayout>
      <header className="employees-header">
        <div className="employees-settings">
          <h1>Employees</h1>
          <button className="btn btn-outlined btn-black ">
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
