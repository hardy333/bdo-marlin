import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <DashboardLayout>
      <section className="home">
        <h1>pages</h1>
        <div className="home-links">
          <Link to="/invoices1">Invoces v1</Link>
          <Link to="/invoices2">Invoces v2</Link>
          <Link to="/profile">profile</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/vendors">vendors</Link>
          <Link to="/dashboard">dashboard table old</Link>
          <Link to="/all-orders">all orders table </Link>
          <Link to="/ag-table">ag table</Link>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Home;
