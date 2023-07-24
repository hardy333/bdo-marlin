const InvoiceDetailsTableDefs =[
    {
      field: "Order #",
      headerName: "შეკვეთის #",
      hide: true,
    },
    {
      field: "Barcode",
      headerName: "ბარკოდი",
    },
    {
      field: "Product",
      headerName: "პროდუქტი",
    },
    {
      field: "Quantity",
      headerName: "რაოდენობა",
      cellRenderer: (params) => {
        let { value } = params;
        if (!value) {
          value = Math.floor(Math.random() * 1000 + 20);
        }
        return value;
      },
    },
    {
      field: "Order Amount",
      headerName: "შეკვეთის თანხა",
      cellRenderer: (params) => {
        let { value } = params;
        if (!value) {
          value = Math.floor(Math.random() * 100 + 20);
        }
        return value + " " + "GEL";
      },
    },
    {
      field: "Invoice Amount",
      headerName: "ინვოისის თანხა",

      cellRenderer: (params) => {
        let { value } = params;

        let newVal = null;

        if (Math.random() - 0.5 < 0) {
          newVal = Number(value) + Math.floor(Math.random() * 10 + 2);
        }

        if (!value) value = 10;
        return (
          <span>
            <span style={{ color: newVal ? "#f55364" : "" }}>
              {newVal ? newVal : value} GEL{" "}
            </span>
          </span>
        );
      },
    },
  ]


const invoiceDetailsTableHeaderList = [
    {
      name: "Order #",
      showingName: "შეკვეთის #",
      isShowing: true,
    },
    {
      name: "Barcode",
      showingName: "ბარკოდი",

      isShowing: true,
    },
    {
      name: "Product",
      isShowing: true,
      showingName: "პროდუქტი",
    },
    {
      name: "Quantity",
      isShowing: true,
      showingName: "რაოდენობა",
    },
    {
      name: "Invoice Amount",
      isShowing: true,
      showingName: "ინვოისის თანხა",
    },
  ]



export {
    invoiceDetailsTableHeaderList, 
    InvoiceDetailsTableDefs
}