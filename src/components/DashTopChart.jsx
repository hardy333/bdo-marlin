import React from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/sla-chart.css";

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
      formatter: (seriesName) => seriesName + ":   ",
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
    height: "100%",
    type: "line",
    toolbar: false,
    fontFamily: "DejaVu Sans",
    toolbar: {
      show: true,
    },
  },
  zoom: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
    // colors: ["#ff0000", "#F55364"],
  },
  colors: ["#6E0FF5", "#F55364", "#546E7A", "#E91E63", "#FF9800"],
  legend: {
    markers: {
      colors: ["#F55364", "#6E0FF5"],
    },
    // tooltipHoverFormatter: function(val, opts) {
    //   return val + ' - //////////////'
    // },
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -30,
    // offsetX: -5,
  },
  title: {
    text: "ზოგადი სერვისის დონის დინამიკა",
    align: "left",
    offsetY: 10,
    offsetX: 8,
    style: {
      fontFamily: "DejaVu Sans",
      fontWeight: 700,
      fontSize: "16px",
      fill: "rgb(42, 31, 75)",
      color: "yellow",
    },
  },
  markers: {
    // size: 4
  },
  xaxis: {
    crosshairs: {
      show: false,
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
    zoom: {
      enabled: false,
    },

    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    labels: {
      show: false,
    },
    // title: {
    //   text: "Time Duration",
    // },
  },
  yaxis: {
    zoom: {
      enabled: false,
    },
    // categories: ["0%", "25%", "50%", "75%", "100%"],
    // labels: ["Apples", "Oranges", "Berries", "Grapes"],
    // categories: [1, 22, 33, 4, 20, 200],
    labels: {
      show: true,
      formatter: function (value) {
        return value + " %";
      },
      show: true,
      style: {
        colors: ["#D0C7E8"],
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    min: 0,
    max: 100,
    tickAmount: 4,
    // show: false,
    // step: 25,
    // title: {
    //   text: "Avarage Service Level",
    // },
  },

  grid: {
    borderColor: "#D0C7E8",
  },
  tooltip,

  // title: {
  //   text: "Average High & Low Temperature",
  //   align: "right",
  // },

  responsive: [
    {
      breakpoint: 600,
      options: {
        title: {
          style: {
            fontSize: "14px",
            // fill: "rgb(42, 31, 75)",
            color: "green",
          },
        },
      },
    },
  ],
};

const A = {
  a1: [31, 70, 28, 51, 88, 60, 100, 50, 30, 40, 60, 60],
  // a2: [80, 30, null, 15, null, 30, 40, 20, 90, 20, 90, 40],
  // a2: [-0.33016749 -0.30709238 -0.31876528 -0.2898231  -0.32095318 -0.33307278 -0.30132217 -0.26506558 -0.27400985 -0.29838076 -0.31171625 -0.31569697]
  // a2: [ 69,  77,  72,  86,  70,  68,  82, 50, 94, 100]
  a2: [73, 82, 62, 79, 55, 80, 40, 40, 30, 80, 40, 90],
};

const B = {
  b1: [90, 32, 45, 32, 20, 52, 41, 20, 30, 40, 70, 30],
  b2: [50, 30, 65, 30, 74, 50, 91, 30, 40, 40, 80, 70],
};

const DashTopChart = ({ dataA = "a2", dataB = "b2" }) => {
  const series = [
    {
      name: "2022",
      data: A[dataA],
    },
    {
      name: "2023",
      data: B[dataB],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={200}
      width={"100%"}
    />
  );
};

export default DashTopChart;
