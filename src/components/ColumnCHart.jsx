import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/column-chart.css";

const colors = [
  "rgba(64, 106, 255, 1)",
  "rgba(64, 106, 255, 1)",
  "rgba(64, 106, 255, 1)",
  "rgba(64, 106, 255, 1)",
  "rgba(64, 106, 255, 1)",
];

const series = [
  {
    data: [74, 80, 78, 60, 90],
  },
];

const tooltip = {
  enabled: true,
  enabledOnSeries: undefined,
  shared: true,
  followCursor: false,
  intersect: false,
  inverseOrder: false,
  // custom: function(props) {
  //   console.log(props)

  //   return '<div class="arrow_box" style="color: red; background: yellow">' +
  //     '<span>' + "sssssssssssssssssssssss" + '</span>' +
  //     '</div>'
  // },
  fillSeriesColor: false,
  theme: true,
  style: {
    fontSize: "12px",
    fontFamily: undefined,
  },
  onDatasetHover: {
    highlightDataSeries: false,
  },
  x: {
    format: "dd MMM",
    show: true,
    // formatter: (x) => {
    //   return x + " %";
    // },
  },
  y: {
    formatter: (x) => {
      return x + " %";
    },
    title: {
      formatter: (seriesName) => "",
    },
  },
  z: {
    formatter: undefined,
    title: "Size: ",
  },
  marker: {
    show: true,
  },
  items: {
    display: "flex",
  },
  fixed: {
    enabled: false,
    position: "topRight",
    offsetX: 0,
    offsetY: 0,
  },
};

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
      style: {
        colors: ["#D0C7E8"],
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    min: 0,
    max: 100,
    tickAmount: 4,
  },

  tooltip,
};

const ColumnCHart = () => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default ColumnCHart;
