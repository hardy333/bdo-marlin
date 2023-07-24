import vendorsArr from "../data/vendors-data";


const InvoicesTableDefs = [
    {
      field: "Date",
      headerName: "თარიღი",
    },
    {
      field: "Waybill #",
      headerName: "ზედნადები",

    },
    {
      field: "Documnet #",
      headerName: "შეკვეთის #",

    },
    {
      field: "Vendor",
      headerName: "მომწოდებელი",
      cellRenderer: (params) => {
        return vendorsArr[Math.floor(Math.random() * vendorsArr.length)].value;
      },
    },
    {
      field: "Shop",
      headerName: "მაღაზია",

    },
    {
      field: "Amount",
      headerName: "შეკვეთის თანხა",

      cellRenderer: (params) => {
        let { value } = params;
        if (!value) value = 10;
        return value + " " + "GEL";
      },
    },
    {
      field: "invoice Amount",
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
            <span style={{color: newVal ? "#f55364" : ""}}>{newVal ? newVal : value} GEL </span> 
            
          </span>
        )
      },
    },
    {
      field: "Status",
      headerName: "სტატუსი",
      hide: true,
      cellRenderer: (params) => {
        const { value } = params;
        const x = Number(value);
        if (!value || x % 2 === 0)
          return (
            <button className="invoices-table-status-btn invoices-table-status-btn--danger ">
              To be paid
            </button>
          );
        return (
          <button className="invoices-table-status-btn invoices-table-status-btn--success">
            Paid
          </button>
        );
      },
    },
  ]


const invoicesTableHeaderList = [
    {
      showingName: "თარიღი",
      name: "Date",
      isShowing: true,
    },
    {
      showingName: "ზედნადები",
      name: "Waybill #",
      isShowing: true,
    },
    {
      showingName: "დოკუმენტის #",
      name: "Documnet #",
      isShowing: true,
    },
    {
      showingName: "მომწოდებელი",
      name: "Vendor",
      isShowing: true,
    },
    {
      showingName: "მაღაზია",
      name: "Shop",
      isShowing: true,
    },
    {
      showingName: "რაოდენობა",
      name: "Amount",
      isShowing: true,
    },
  ]


export {
    invoicesTableHeaderList, 
    InvoicesTableDefs
}