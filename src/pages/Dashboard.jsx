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
  const [option, setOption] = useState("Snacks");
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  let options;

  if (allData) {
    if (type === "By item") {
      options = allData["By item"].map(
        (product) => product["Product Category"]
      );
      options = new Set(options);
    } else {
      options = allData["By shop"].map((product) => product["Address"]);
      options = new Set(options);
    }
  }

  console.log(searchValue);
  return (
    <div className="dashboard">
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <DashboardAside />
      <DashboardNavbar />
      <main className="dashboard-main">
        <div className="dashboard-main__container">
          <DashboardSettings
            options={options}
            setOption={setOption}
            type={type}
            setType={setType}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          {allData ? (
            <Table
              searchValue={searchValue}
              type={type}
              option={option}
              tableData={allData[type]}
            />
          ) : (
            <Loader />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
