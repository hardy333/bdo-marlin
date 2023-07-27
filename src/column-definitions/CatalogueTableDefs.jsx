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

      return value + " " + "GEL";
    },
  },
  {
    field: "lastOrderPrice",
    headerName: "წინა ფასი",
    cellRenderer: (params) => {
      const { value } = params;
      const price = params.data.price;


      let newVal = value;
      let randNam = Math.random();
      if (randNam - 0.3 < 0) {
        newVal = value + 1;
      } else if (randNam - 0.6 < 0) {
        newVal = value - 1;
      }

      return (
        <div
          style={{ height: "100%", display: "flex" }}
          className="items-center  gap-4 pe-20"
        >
          <span style={{ width: "50px" }}>{newVal + " " + "GEL"}</span>
          <TriangleSvg
            fill={newVal > price ? "#FF3360" : "#6E0FF5"}
            style={{
              transform: newVal > price ? "rotate(180deg)" : "rotate(0deg)",
              display: newVal === price ? "none" : null,
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
