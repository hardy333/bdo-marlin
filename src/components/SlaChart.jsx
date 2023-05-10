import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/sla-chart.css";

const series = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];
const options = {
  chart: {
    height: 350,
    type: "line",
  },
  zoom: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    // colors: ["#6E0FF5", "#F55364"],
  },
  legend: {
    // show: false,
  },
  colors: ["#6E0FF5", "#F55364", "#546E7A", "#E91E63", "#FF9800"],
  legend: {
    markers: {
      colors: ["#6E0FF5", "#F55364"],
    },
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
    // colors: ["#6E0FF5", "#F55364"],
  },
};

const SlaChart = () => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
      width={1100}
    />
  );
};

export default SlaChart;
