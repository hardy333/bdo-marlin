import React, { Suspense } from "react";
// import ExcelExportBtn from "./ExcelExportBtn";
const ExcelExportBtn = React.lazy(() => import("./ExcelExportBtn"));


const LazyExcelExportBtn = ({ data, name = "data" }) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "5px solid transparent",
          }}
        >
          abc
        </div>
      }
    >
      <ExcelExportBtn data={data} name={name} />
    </Suspense>
  );
};

export default LazyExcelExportBtn;
