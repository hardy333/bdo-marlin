import React from "react";
import ExcelExportSvg from "./svgs/service-level-svgs/ExcelExportSvg";
import exportData from "../utils/exportData";

const ExcelExportBtn = ({ data, name = "data" }) => {
  return (
    <button
      className="all-orders__btn excel-export-btn"
      onClick={() => exportData(data, name)}
    >
      <ExcelExportSvg />
    </button>
  );
};

export default ExcelExportBtn;
