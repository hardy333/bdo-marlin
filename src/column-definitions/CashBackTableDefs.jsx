const CashBackTableDefs = [
    {
      headerName: "",
      children: [
        {
          field: "barcode",
          headerName: "ბარკოდი",
        },
        {
          field: "product",
          headerName: "პროდუქტი",
          cellRenderer: (params) => {
            const { value } = params;
            return value;
          },
        },
        {
          field: "bonus",
          headerName: "ბონუსი",
          cellRenderer: (params) => {
            const { value } = params;
            return value + " %";
          },
        },
      ],
    },
    {
      headerName: "აქციის შედეგები",
      children: [
        {
          field: "purchased",
          headerName: "შესყიდვები, თანხა",
          cellRenderer: (params) => {
            const { value } = params;
            return value + " GEL";
          },
        },
        {
          field: "stockBalance",
          headerName: "მარაგი",
          cellRenderer: (params) => {
            const { value } = params;
            return value;
          },
        },
      ],
    },
  ]



const cashBackTableHeaderList = [
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
    //   {
    //     name: "minQuantity",
    //     showingName: "მინ. რაოდენობა",

    //     isShowing: true,
    //   },
    //   {
    //     name: "maxQuantity",
    //     showingName: "მიქს. რაოდენობა",

    //     isShowing: true,
    //   },
    {
      name: "bonus",
      showingName: "ბონუსი",

      isShowing: true,
    },
    {
      name: "purchased",
      showingName: "შესყიდული",

      isShowing: true,
    },
    //   {
    //     name: "sold",
    //     showingName: "გაყიდული",

    //     isShowing: true,
    //   },
    {
      name: "stockBalance",
      showingName: "ნაშთი",

      isShowing: true,
    },
  ]



export {
    cashBackTableHeaderList, 
    CashBackTableDefs
}