import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

const Home = () => {
  return (
    <DashboardLayout>
      <section className="home">
        <h1>pages</h1>

        <div className="home-links-container">
          <div className="home-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/prices">Prices</Link>
            <Link to="/main-dashboard">Main Dashboard</Link>
            <Link to="/invoices1">Invoces v1</Link>
            <Link to="/invoices2">Invoces v2</Link>
            <Link to="/profile">profile</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/vendors">vendors</Link>
            <small className="mt-4">Old Tables</small>
            <Link to="/dashboard">dashboard table old</Link>
            <Link to="/all-orders">all orders table </Link>
          </div>
          <div className="home-links">
            <Link to="/ag-table">ag table</Link>
            <Link to="/order-details">Order Details</Link>
            <Link to="/invoices-table">Invoices Table</Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Home;
