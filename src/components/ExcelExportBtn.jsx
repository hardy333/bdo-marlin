import React from "react";
import ExcelExportSvg from "./svgs/service-level-svgs/ExcelExportSvg";
import exportData from "../utils/exportData";
import Tippy from "@tippyjs/react";

const ExcelExportBtn = ({ data, name = "data" }) => {
  return (
    <Tippy
    className="tooltip-1"
    arrow={false}
    placement="top"
    content="ექსელში ექსპორტი"
  >
    <button
      className="all-orders__btn excel-export-btn"
      onClick={() => exportData(data, name)}
    >
      <ExcelExportSvg />
    </button>
    </Tippy>
  );
};

export default ExcelExportBtn;
