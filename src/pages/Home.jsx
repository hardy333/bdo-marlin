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
            <hr />
            <Link to="/ag-table">ag table</Link>
            <hr />
            <br />
            <small>Orders</small>
            <hr />
            <Link to="/all-orders-parent">All Orders</Link>
            <Link to="/order-details">Order Details</Link>
            <hr />

            <br />
            <small>
              Vendor all Orders(ერთი კონკრეტული ვენდორისთვის ყველა შეკვეთა ??)
            </small>
            <hr />
            <Link to="/vendor-all-orders">vendor all orders</Link>
            <hr />

            <br />
            <small>Reports</small>
            <hr />
            <Link to="/reports">service level reports</Link>
            <Link to="/reports-child">service level reports details</Link>
            <hr />
            <br />
            <small>Single tables</small>
            <hr />
            <Link to="/new-catalogue">New Catalogue with backend data</Link>
            <Link to="/invoices-table">Invoices Table</Link>
            <Link to="/logs">Logs/Settings Table</Link>
            <Link to="/catalogue">Catalogue Table</Link>
            <Link to="/stable-table">Stable Table</Link>
            <hr />
          </div>
          <div className="home-links">
            <small>Geo tables</small>
            <Link to="/catalogue-geo">Catalogue geo</Link>
            <Link to="/catalogue-geo-resize">Catalogue geo with resize </Link>
            <br />
            <small>new 4 Tables</small>
            <Link to="/catalogue">Catalogue 3</Link>
            <Link to="/catalogue-5-level">Catalogue 5</Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Home;
