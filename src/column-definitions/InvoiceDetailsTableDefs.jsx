const InvoiceDetailsTableDefs =[
  
    {
      field: "barcode",
      headerName: "ბარკოდი",
    },
    {
      field: "product",
      headerName: "პროდუქტი",
    },
    {
      field: "invoiceQuantity",
      headerName: "რაოდენობა",
      cellRenderer: (params) => {
        let { value } = params;
        return value;
      },
    },
    {
      field: "orderAmount",
      headerName: "შეკვეთის თანხა",
      cellRenderer: (params) => {
        let { value } = params;
        return value + " " + "GEL";
      },
    },
    {
      field: "invoiceAmount",
      headerName: "ინვოისის თანხა",
      cellRenderer: (params) => {
        let { value } = params;
        const {redStatus} = params.data
       
        return <span style={{color: redStatus ? "#f55364": "" }}>{value + " GEL"} </span>;
      },
    },
  ]


const invoiceDetailsTableHeaderList = [
  
    {
      name: "barcode",
      showingName: "ბარკოდი",

      isShowing: true,
    },
    {
      name: "product",
      isShowing: true,
      showingName: "პროდუქტი",
    },
    {
      name: "invoiceQuantity",
      isShowing: true,
      showingName: "რაოდენობა",
    },
    {
      name: "orderAmount",
      isShowing: true,
      showingName: "შეკვეთის თანხა",
    },
    {
      name: "invoiceAmount",
      isShowing: true,
      showingName: "ინვოისის თანხა",
    },
  ]



export {
    invoiceDetailsTableHeaderList, 
    InvoiceDetailsTableDefs
}