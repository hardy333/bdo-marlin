const SlaByOrdersTableDefs = [
    {
      field: "orderNumber",
      headerName: "შეკვეთის #",
      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    },
    {
      field: "orderDate",
      headerName: "თარიღი",
      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    },
    {
      field: "shop",
      headerName: "მაღაზია",
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
  ]


const slaByOrdersTableHeaderList = [
    {
      name: "orderNumber",
      showingName: "შეკვეთის #",
      
      isShowing: true,
    },
    {
      name: "orderDate",
      showingName: "თარიღი",
      isShowing: true,
    },
    {
      name: "shop",
      showingName: "მაღაზია",
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
 
  ]


export {
    slaByOrdersTableHeaderList, 
    SlaByOrdersTableDefs
}