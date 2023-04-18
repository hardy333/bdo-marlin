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
          <Link to="/dashboard">dashboard table old</Link>
          <Link to="/all-orders">all orders table </Link>
          <Link to="/ag-table">ag table</Link>
        </div>

        {/* <Menu menuButton={<MenuButton>xx</MenuButton>} transition>
          <div style={{ position: "relative", zIndex: 999999 }}>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, labore
            animi? Cumque, reiciendis vitae. Aliquid officiis ad assumenda
            consectetur, eos magni, consequuntur aperiam quibusdam voluptatem
            optio incidunt minima! Ad, dolores?
          </div>
        </Menu> */}
      </section>
    </DashboardLayout>
  );
};

export default Home;
