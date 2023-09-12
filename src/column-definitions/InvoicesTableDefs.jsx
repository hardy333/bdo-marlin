import vendorsArr from "../data/vendors-data";

const InvoicesTableDefs = [
  {
    field: "date",
    headerName: "თარიღი",
    cellRenderer: (params) => {
      let { value, data } = params;
      if (!value) return "";

      console.log(value)

      return <span id="invoice-id-span" 
      data-order-id={data.orderID} 
      data-order-number={data.orderNumber} 

      data-waybill-number={data.waybillNumber} 

      data-invoice-number={data.invoiceNumber}
      data-invoice-amount={data.invoiceAmount}
      data-invoice-id={data.invoiceID}

      data-amount={data.orderAmount} 
      data-vendor={data.vendor} 
      data-shop={data.shop} 

      data-date={data.date}

      >{value.split("T")[0].split("-").reverse().join("/")}</span>;
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
