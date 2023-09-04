import vendorsArr from "../data/vendors-data";

const InvoicesTableDefs = [
  {
    field: "date",
    headerName: "თარიღი",
    cellRenderer: (params) => {
      let { value, data } = params;
      if (!value) return "";
      return <span id="invoice-id-span" 
      data-orderID={data.orderID} 
      data-orderNumber={data.orderNumber} data-waybillNumber={data.waybillNumber} 
      data-invoiceNumber={data.invoiceNumber}
      data-vendor={data.vendor} 
      data-date={data.date}
      data-invoiceID={data.invoiceID}
      >{value.split("T")[0]}</span>;
    },
  },
  {
    field: "waybillNumber",
    headerName: "ზედნადები",
  },
  {
    field: "orderID",
    headerName: "შეკვეთის #",
  },
  {
    field: "vendor",
    headerName: "მომწოდებელი",
  },
  {
    field: "shop",
    headerName: "მაღაზია",
  },
  {
    field: "orderAmount",
    headerName: "შეკვეთის თანხა",

    cellRenderer: (params) => {
      let { value } = params;
      if (!value) return "";
      return value + " " + "GEL";
    },
  },
  {
    field: "invoiceAmount",
    headerName: "ინვოისის თანხა",
    cellRenderer: (params) => {
      let { value } = params;
      if (!value) return "";
      return value + " " + "GEL";
    },
  },
];

const invoicesTableHeaderList = [
  {
    showingName: "თარიღი",
    name: "date",
    isShowing: true,
  },
  {
    showingName: "ზედნადები",
    name: "waybillNumber",
    isShowing: true,
  },
  {
    showingName: "შეკვეთის #",
    name: "orderID",
    isShowing: true,
  },
  {
    showingName: "მომწოდებელი",
    name: "vendor",
    isShowing: true,
  },
  {
    showingName: "მაღაზია",
    name: "shop",
    isShowing: true,
  },
  {
    showingName: "შეკვეთის თანხა",
    name: "orderAmount",
    isShowing: true,
  },

  {
    showingName: "ინვოისის თანხა",
    name: "invoiceAmount",
    isShowing: true,
  },
];

export { invoicesTableHeaderList, InvoicesTableDefs };
