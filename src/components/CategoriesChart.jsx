import React from "react";
import "../styles/categories-chart.css"


const data = [
  {
    name: "ალკოჰოლი",
    sla: 42,
  },
  {
    name: "სიგარეტი",
    sla: 76,
  },
  {
    name: "პური",
    sla: 87,
  },
  {
    name: "სნექები",
    sla: 45,
  },
  {
    name: "ყავა და ჩაი",
    sla: 56,
  },
  {
    name: "ტკბილეული",
    sla: 40,
  },
  {
    name: "ბისკვიტი/ზეფირი",
    sla: 95,
  },
  {
    name: "ბოსტნეული",
    sla: 81,
  },
  {
    name: "ღვინო",
    sla: 82,
  },
];

const CategoriesChart = () => {
  return (
    <div className="categories-chart">
      <h2>სერვისის დონე კატეგორიებით</h2>
      <section className="lists-container">
        <ul className="names-list">
          {data.map((obj) => (
            <li className="names-li" key={obj.name}>{obj.name}</li>
          ))}
        </ul>
        <ul className="sla-list">
          {data.map((obj) => (
            <li className="sla-li" key={obj.name}>
                <span className="sla-bar" style={{width: obj.sla + "%"}}></span>
                <span className="sla-value">{obj.sla}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CategoriesChart;
