import Tippy from "@tippyjs/react";
import TriangleSvg from "../components/svgs/TriangleSvg";

const catalogueTableHeaderList = [
  {
    name: "barcode",
    showingName: "ბარკოდი",
    isShowing: true,
  },
  {
    name: "product",
    showingName: "პროდუქტი",
    isShowing: true,
  },
  {
    name: "unit",
    showingName: "ერთეული",
    isShowing: true,
  },
  {
    name: "price",
    showingName: "ფასი",
    isShowing: true,
  },
  {
    name: "lastOrderPrice",
    showingName: "წინა ფასი",
    isShowing: true,
  },
  {
    name: "lastChangeDate",
    showingName: "ცვლილების თარიღი ",
    isShowing: true,
  },
  {
    name: "status",
    showingName: "სტატუსი",
    isShowing: true,
  },
];

const CatalogueTableDefs = [
  {
    field: "barcode",
    headerName: "ბარკოდი",
  },
  {
    field: "product",
    headerName: "პროდუქტი",
    minWidth: 200,

    cellRenderer: (params) => {
      const { value } = params;
      if (!value) return "";

      if (value.length >= 23) {
        return (
          <>
            <Tippy
              className="tooltip-1"
              arrow={false}
              placement="top"
              content={`${value}`}
            >
              <span>{value}</span>
            </Tippy>
          </>
        );
      }

      return params.value;
    },
  },
  {
    field: "unit",
    headerName: "ერთეული",
    maxWidth: 150,
  },
  {
    field: "price",
    headerName: "ფასი",
    maxWidth: 150,

    cellRenderer: (params) => {
      const { value } = params;
      if (!value) {
        return null;
      }

      return value + " " + "GEL";
    },
  },
  {
    field: "lastPrice",
    headerName: "წინა ფასი",
    cellRenderer: (params) => {
      const { value } = params;

      if (!value) {
        return null;
      }

      const price = params.data.price;

      

      return (
        <div
          style={{ height: "100%", display: "flex" }}
          className="items-center  gap-4 pe-20"
        >
          <span style={{ width: "50px" }}>{value + " " + "GEL"}</span>
          <TriangleSvg
            fill={value > price ? "#FF3360" : "#6E0FF5"}
            style={{
              transform: value > price ? "rotate(180deg)" : "rotate(0deg)",
              display: value === price ? "none" : null,
            }}
          />
        </div>
      );
    },
  },
  {
    field: "lastChangeDate",
    headerName: "ცვლილების თარიღი",
    cellRenderer: (params) => {
      const { value } = params;

      if (!value) {
        return null;
      }

      return value.split("T")[0].split("-").reverse().join("/");
    },
  },
  {
    field: "status",
    headerName: "სტატუსი",
    cellRenderer: ({ value }) => {
      let color = "";
      if (value === "აქტიური") {
        color = "#6E0FF5";
      } else if (value === "გაუქმებული") {
        color = "#FF3360";
      } else if (value === "მიუწვდომელი") {
        color = "#FFA23C";
      }
      return (
        <div className="flex items-center" style={{ height: "100%" }}>
          <button
            style={{ color: color }}
            className=" flex items-center px-2 rounded-3xl capitalize text-white p-0 text h-[16px] "
          >
            {value}
          </button>
        </div>
      );
    },
  },
];

export { CatalogueTableDefs, catalogueTableHeaderList };
