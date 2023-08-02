import React from "react";
import ReactApexChart from "react-apexcharts";
const colors = ["rgba(64, 106, 255, 1)", "rgba(64, 106, 255, 1)", "rgba(64, 106, 255, 1)", "rgba(64, 106, 255, 1)", "rgba(64, 106, 255, 1)"];

const series = [
  {
    data: [74, 80, 78, 60, 90],
  },
];

const options = {
  chart: {
    height: 500,
    type: "bar",
    width: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: "12%",
      distributed: true,
      borderRadius: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [
      ["მომწ. 1"],
      ["მომწ. 2"],
      ["მომწ. 3"],
      ["მომწ. 4"],
      ["მომწ. 5"],
    ],
    labels: {
      style: {
        fontSize: "12px",
        colors: ["balck", "black", "black", "balck", "black"],
      },
      // show: false,
      // floating: true,
    },
    axisBorder: {
      show: false,
      color: "#78909C",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: false,
      // borderType: "solid",
      // color: "#78909C",
      // width: 6,
      // offsetX: 0,
      // offsetY: 0,
    },
  },

  yaxis: {
    zoom: {
      enabled: false,
    },
    labels: {
      show: true,
      formatter: function (value) {
        return value + " %";
      },
      style:{
        colors: ["#D0C7E8"],
        fontSize: '12px',
        fontWeight: 500,
      }
    },
    min: 0,
    max: 100,
    tickAmount: 4,
  },
};

const ColumnCHart = () => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default ColumnCHart;
