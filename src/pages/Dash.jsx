import React from "react";
import "../styles/main-dashboard.css";
import "../styles/dash.css";
import DashTopChart from "../components/DashTopChart";
import ColumnCHart from "../components/ColumnCHart";
import RightChartBubbles from "../components/RightChartBubbles";
import CountUp from "react-countup";

import {BsArrowRight} from "react-icons/bs"



const Dash = () => {
  return (
    <>
      <section className="main-dashboard">
        <div className="main-dashboard-stats">
          <div className="stat-card">
            <h3>მაღაზიები</h3>

            <CountUp
              useEasing={false}
              start={0}
              end={324}
              duration={0.5}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>324</h2>}
            </CountUp>
          </div>
          <div className="stat-card">
            <h3>ასორტიმენტი</h3>

            <CountUp
              useEasing={false}
              start={0}
              end={4534}
              duration={0.4}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>4534</h2>}
            </CountUp>
          </div>
          <div className="stat-card">
            <h3>მომწოდებლები</h3>
            <CountUp
              useEasing={false}
              start={0}
              end={523}
              duration={0.6}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>523</h2>}
            </CountUp>
          </div>
          <div className="stat-card">
            <h3>ღია შეკვეთები</h3>
            <CountUp
              useEasing={false}
              start={0}
              end={646}
              duration={0.8}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>646</h2>}
            </CountUp>
          </div>
        </div>

        <div className="main-dashboard-right">
          <div className="header-container">
          <div className="stat-card">
            <h3>ფასდაკლებები</h3>

            <CountUp
              useEasing={false}
              start={0}
              end={64}
              duration={0.5}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>324</h2>}
            </CountUp>
          </div>
          <div className="stat-card">
            <h3>რეტრო ბონუსები</h3>

            <CountUp
              useEasing={false}
              start={0}
              end={84}
              duration={0.4}
              delay={0}
            >
              {({ countUpRef }) => <h2 ref={countUpRef}>4534</h2>}
            </CountUp>
          </div>

          <header
            className="main-dashboard-header"
            style={{ "--animate-duration": "300ms" }}
          >
            <div>
              <h2 className="animate__fadeInDown animate__animated">
                გაგზავნილი შეკვეთები
              </h2>
              <h3 className="animate__fadeInUp animate__animated">
                124,765.88 GEL
              </h3>
            </div>
            <div>
              <h2 className="animate__fadeInDown animate__animated">
                შეკვეთები გზაში
              </h2>
              <h3 className="animate__fadeInUp animate__animated">
                65,540.50 GEL
              </h3>
            </div>
          </header>
          </div>
          {/* Header End */}
          <div className="main-dashboard-charts bg-transparent">
            <div className="top-chart-container gap-[20px]">
              <div className="dash-top-chart-container" style={{width: "70%", background: "#fff", borderRadius: "inherit", paddingBottom: "20px"}}>
                <DashTopChart />
                <span className="chart-view-more">View more <BsArrowRight /></span>
              </div>
              <section className="right-chart relative pb-10" style={{background: "#fff", borderRadius: "inherit", paddingBottom: "20px"}}>
                <h2>პრობლემური მომწოდებლები</h2>
                <RightChartBubbles />
                <span className="chart-view-more">View more  <BsArrowRight /> </span>
              </section>
            </div>
            <div className="bottom-chart-container">
              <section className="left-chart relative">
                <h2>სერვისის დონე: ტოპ 5 მომწოდებელი</h2>
                <ColumnCHart />
                <span className="chart-view-more">View more <BsArrowRight /></span>

              </section>
              <section className="left-chart relative">
                <h2>სერვისის დონე: ტოპ 5 მომწოდებელი</h2>
                <ColumnCHart />
                <span className="chart-view-more">View more<BsArrowRight /> </span>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dash;
