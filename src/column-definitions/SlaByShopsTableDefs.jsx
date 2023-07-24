const SlaByShopsTableDefs = [
  {
    field: "shop",
    headerName: "მაღაზია",
    cellRenderer: (params) => {
      const { value } = params;

      return value;
    },
  },
  {
    field: "orders",
    headerName: "შეკვეთილი რაოდენობა",
    cellRenderer: (params) => {
      const { value } = params;
      return value;
    },
  },
  {
    field: "deliveredQuantity",
    headerName: "მიტანილი რაოდენობა",
    cellRenderer: (params) => {
      const { value } = params;
      return value;
    },
  },
  {
    field: "slaByQuantity",
    headerName: "SL რაოდენობით",
  },
  {
    field: "slaByAmount",
    headerName: "SL თანხით",
    cellRenderer: (params) => {
      const { value } = params;
      return value + " " + "%";
    },
  },
  {
    field: "inTimeOrders",
    headerName: "დროულობა",
    minWidth: 250,
    cellRenderer: (params) => {
      const { value } = params;
      return value + " %";
    },
  },
];

const slaShopsTableHeaderList = [
  {
    name: "shop",
    showingName: "მაღაზია",
    isShowing: true,
  },
  {
    name: "orders",
    showingName: "შეკვეთილი რაოდენობა",
    isShowing: true,
  },
  {
    name: "deliveredQuantity",
    showingName: "მიტანილი რაოდენობა",
    isShowing: true,
  },
  {
    name: "slaByQuantity",
    showingName: "SL. რაოდენობით",
    isShowing: true,
  },
  {
    name: "slaByAmount",
    showingName: "SL. თანხით",
    isShowing: true,
  },
  {
    name: "inTimeOrders",
    showingName: "დროულობა",
    isShowing: true,
  },
];

export { slaShopsTableHeaderList, SlaByShopsTableDefs };
