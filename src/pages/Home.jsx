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
            <small>Sign in pages</small>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/prices">Prices</Link>

            <small className="mt-3">Non table pages</small>
            <Link to="/main-dashboard">Main Dashboard</Link>
            <Link to="/invoices1">Invoces v1</Link>
            <Link to="/invoices2">Invoces v2</Link>
            <Link to="/profile">profile</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/vendors">vendors</Link>

            <small className="mt-3">Old Tables</small>
            <Link to="/dashboard">dashboard table old</Link>
            <Link to="/all-orders">all orders table </Link>
          </div>
          <div className="home-links">
            <small>New Tables</small>
            <Link to="/ag-table">ag table</Link>
            <Link to="/all-orders-parent">All Orders</Link>
            <Link to="/order-details">Order Details</Link>
            <Link to="/invoices-table">Invoices Table</Link>
            <Link to="/logs">Logs/Settings Table</Link>
            <Link to="/catalogue">Catalogue Table</Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Home;
