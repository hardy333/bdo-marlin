import ExcelExportSvg from "./svgs/service-level-svgs/ExcelExportSvg";
// import exportData from "../utils/exportData";

let exportData1;

const getX = async () => {
  const { exportData } = await import("../utils/exportData");

  exportData1 = exportData;
};

getX();

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
        onClick={() => exportData1(data, name)}
      >
        <ExcelExportSvg />
      </button>
    </Tippy>
  );
};

export default ExcelExportBtn;
