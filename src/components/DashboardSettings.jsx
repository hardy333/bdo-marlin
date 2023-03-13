import React from "react";
import filter from "../assets/icons/filter.png";
import filterList from "../assets/icons/list.png";
import search from "../assets/icons/search.png";

const DashboardSettings = ({ type, setType, setOption }) => {
  return (
    <header className="settings">
      <div className="settings__top">
        <h1>SPAR Service Level Report</h1>

        <div className="settings__filters">
          <button>
            <img src={filter} alt="" />
          </button>
          <button>
            <img src={filterList} alt="" />
          </button>
          <button>
            <img src={search} alt="" />
          </button>
          <input type="text" />
        </div>
      </div>
      <div className="settings__bottom">
        <div className="carousel">
          <div className="carousel-item">Sweets</div>
          {/* <div className="carousel-item">Bavarages</div> */}
          <div className="carousel-item">frozen Goods</div>
          <div className="carousel-item active">Snacks</div>
          <div className="carousel-item">Bakes Goods</div>
        </div>
        <div className="options-container">
          <div className="input-group">
            <input
              type="radio"
              id="By item"
              name="type"
              checked={type === "By item"}
              onChange={(e) => {
                setType("By item");
                setOption("Snacks");
              }}
            />
            <label htmlFor="By item">By item</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="By shop"
              name="type"
              checked={type === "By shop"}
              onChange={(e) => {
                setType("By shop");
                setOption("N.Ramishvili 33");
              }}
            />
            <label htmlFor="By shop">By shop</label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardSettings;
