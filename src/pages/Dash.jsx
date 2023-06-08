import React from "react";
import "../styles/main-dashboard.css";
import ApexChart1 from "../components/ApexChart1";
import ApexChart2 from "../components/ApexChart2";
import "../styles/dash.css";
import DashTopChart from "../components/DashTopChart";
import { Link } from "react-router-dom";
import BubbleChat from "../components/BubbleChat";
import ColumnCHart from "../components/ColumnCHart";
import RightChartBubbles from "../components/RightChartBubbles";

const Dash = () => {
  return (
    <>
      <section className="main-dashboard">
        <div className="main-dashboard-stats">
          <div className="stat-card">
            <h3>მაღაზიები</h3>
            <h2>324</h2>
          </div>
          <div className="stat-card">
            <h3>
              ასორტიმენტი
            </h3>
            <h2>246</h2>
          </div>
          <div className="stat-card">
            <h3>ვენდორები</h3>
            <h2>523</h2>
          </div>
          <div className="stat-card">
            <h3>ღია ორდერები</h3>
            <h2>246</h2>
          </div>
        </div>

        <div className="main-dashboard-right">
          <header className="main-dashboard-header">
            <div>
              <h2>გაგზავნილი შეკვეთები</h2>
              <h3>124,765.88 GEL</h3>
            </div>
            <div>
              <h2>მიმდინარე ორდერები</h2>
              <h3>65,540.50 GEL</h3>
            </div>
          </header>
          <div className="main-dashboard-charts">
            <div className="top-chart-container">
              <DashTopChart />
            </div>
            <div className="bottom-chart-container">
              <section className="left-chart">
                <h2>სერვისის დონე: ტოპ 5 ვენდორი</h2>
                <ColumnCHart />
              </section>
              <section className="right-chart">
              <h2>პრობლემური მომწოდებლები</h2>
                <RightChartBubbles />
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dash;
