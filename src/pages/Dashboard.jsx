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
  console.log(allData)
  
  // "By item" or "By shop"
  const [type, setType] = useState("By item");
  const [option, setOption] = useState("სნეკები");
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [avgSLA, setAvgSLA] = useState(null);

  let options;

  if (allData) {
    if (type === "By item") {
      options = allData["By item"].map(
        (product) => product["Product Category"]
      );
      options = Array.from(new Set(options));
    } else {
      options = allData["By shop"].map((product) => product["Address"]);
      options = Array.from(new Set(options));
    }
  }

  return (
    <div className="dashboard">
      <DashboardAside />
      <DashboardNavbar />
      <main className="dashboard-main">
        <div className="dashboard-main__container">
          <DashboardSettings
            options={options}
            option={option}
            setOption={setOption}
            type={type}
            setType={setType}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isSorting={isSorting}
            setIsSorting={setIsSorting}
            avgSLA={avgSLA}
          />
          {allData ? (
            <Table
              setAvgSLA={setAvgSLA}
              searchValue={searchValue}
              type={type}
              option={option}
              tableData={allData[type]}
              isSorting={isSorting}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <Loader />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
