const ReportsTableDefs = [
    {
      field: "vendor",
      headerName: "მომწოდებელი",
      cellRenderer: (params) => {
        return params.value;
      },
    },
    {
      field: "orders",
      headerName: "შეკვეთები",

      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    },
    {
      field: "amount",
      headerName: "შეკვეთის თანხა",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "Gel";
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
        return value + " " + "Gel";
      },
    },
    {
      field: "inTimeOrders",
      headerName: "დროულობა",
      minWidth: 250,
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "%";
      },
    },
  ]


const reportsTableHeaderList = [
    {
      name: "vendor",
      showingName: "მომწოდებელი",
      isShowing: true,
    },
    {
      name: "orders",
      showingName: "შეკვეთები",
      isShowing: true,
    },
    {
      name: "amount",
      showingName: "შეკვეთის თანხა",
      isShowing: true,
    },
    {
      name: "slaByQuantity",
      showingName: "SL რაოდენობით",
      isShowing: true,
    },
    {
      name: "slaByAmount",
      showingName: "SL თანხით",
      isShowing: true,
    },
    {
      name: "inTimeOrders",
      showingName: "დროულობა",
      isShowing: true,
    },
  ]



export  {
    reportsTableHeaderList, 
    ReportsTableDefs
}