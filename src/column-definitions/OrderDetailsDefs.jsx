const OrderDetailsDefs = [
  {
    field: "barcode",
    headerName: "ბარკოდები",
    cellRenderer: (params) => {
      const { value } = params;
      return value;
    },
  },
  {
    field: "product",
    headerName: "პროდუქტი",
  },
  {
    field: "quantity",
    headerName: "რაოდენობა",
  },
  {
    field: "price",
    headerName: "ფასი",
    cellRenderer: (params) => {
      const { value } = params;
      return value + " " + "GEL";
    },
  },
  {
    field: "amount",
    headerName: "თანხა",
    cellRenderer: (params) => {
      const { value } = params;
      return value + " " + "GEL";
    },
  },
  {
    field: "reservedQuantity",
    headerName: "დარეზერვირებული ",
    cellRenderer: (params) => {
      const { value } = params;
      let color = "";
      if (params.data.redStatus) {
        color = "red";
      }
      return <span style={{ color: color }}>{value}</span>;
    },
  },
];

const orderDetailsHeaderList = [
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
    name: "quantity",
    showingName: "რაოდენობა",
    isShowing: true,
  },
  {
    name: "price",
    showingName: "ფასი",
    isShowing: true,
  },
  {
    name: "amount",
    showingName: "თანხა",
    isShowing: true,
  },
  {
    name: "reservedQuantity",
    showingName: "დარეზერვებული",
    isShowing: true,
  },
];

export { orderDetailsHeaderList, OrderDetailsDefs };
