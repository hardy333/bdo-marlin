import React, { useState } from "react";
import { useQuery } from "react-query";
import DashboardAside from "../components/DashboardAside";
import Loader from "../components/Loader";
import Table from "../components/Table";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSettings from "../components/DashboardSettings";
import * as XLSX from "xlsx";
import fetch_XLSX_DATA from "../utils/getData.js";

const Dashboard = () => {
  const { data: allData } = useQuery("todos", fetch_XLSX_DATA);
  // "By item" or "By shop"
  const [type, setType] = useState("By item");

  const [count, setCount] = useState(0);

  return (
    <div className="dashboard">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <DashboardAside />
      <DashboardNavbar />
      <main className="dashboard-main">
        <div className="dashboard-main__container">
          <DashboardSettings type={type} setType={setType} />
          {allData ? (
            <Table type={type} tableData={allData[type]} />
          ) : (
            <Loader />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
