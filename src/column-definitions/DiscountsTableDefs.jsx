const DiscountTableDefs = [
    {
      name: "Product",
      showingName: "პროდუქტი",
      isShowing: true,
    },
    {
      name: "Standard Price",
      showingName: "სტანდარტული ფასი",

      isShowing: true,
    },
    {
      name: "Discount price",
      showingName: "ფასდაკლების ფასი",

      isShowing: true,
    },
    {
      name: "Min Quantity",
      showingName: "მინ. რაოდენობა",

      isShowing: true,
    },
    {
      name: "Max Quantity",
      showingName: "მაქს. რაოდენობა",

      isShowing: true,
    },
    {
      name: "Min Amount",
      showingName: "მინ. თანხა",

      isShowing: true,
    },
    {
      name: "Ordered Amount",
      showingName: "გადახდილი თანხა",

      isShowing: true,
    },
    {
      name: "Ordered Quantity",
      showingName: "შეკვეთილი რაოდენობა ",

      isShowing: true,
    },
  ]



const discountTableHeaderList = [
    {
      headerName: "",
      children: [
        {
          field: "Product",
          headerName: "პროდუქტი",
        },
        {
          field: "Standard",
          headerName: "სტანდარტული ფასი",
          cellRenderer: (params) => {
            const { value } = params;
            return value + " GEL";
          },
        },
        {
          field: "Discount price",
          headerName: "ფასდაკლების თანხა",

          cellRenderer: (params) => {
            const { value } = params;
            return <span style={{ color: "#6E0FF5" }}>{value + " GEL"}</span>;
          },
        },
      ],
    },
    {
      headerName: "ფასდაკლების პირობები",
      children: [
        {
          field: "Min Quantity",
          headerName: "მინ. რაოდენობა",
        },
        {
          field: "Max Quantity",
          headerName: "მაქს. რაოდენობა",

          cellRenderer: (params) => {
            const { value } = params;
            return value;
          },
        },
        {
          field: "Min Amount",
          headerName: "მინ. ღირებულება",

          cellRenderer: (params) => {
            const { value } = params;
            return value + " " + "GEL";
          },
        },
      ],
    },
    {
      headerName: "უკვე შეძენლი",
      children: [
        {
          field: "Ordered Amount",
          headerName: "გადახდილი თანხა",

          cellRenderer: (params) => {
            const { value } = params;
            return value + " " + "GEL";
          },
        },
        {
          field: "Ordered Quantity",
          headerName: "შეკვეთილი რაოდენობა",

          cellRenderer: (params) => {
            const { value } = params;
            return value;
          },
        },
      ],
    },
  ]




export {
    discountTableHeaderList, 
    DiscountTableDefs
}