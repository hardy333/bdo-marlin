const getCashBackTableDefs = (isShowingBonuses ) => {
  console.log(isShowingBonuses, isShowingBonuses ? false : true )
  

return [
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
          field: "retroPercent",
          headerName: "ბონუსი",
          hide: isShowingBonuses ? false : true, 
          cellRenderer: (params) => {
            const { value } = params;

            console.log("bonus value", value)
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
            return undefined + ".";
          },
        },
      ],
    },
  ]

}



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
      name: "retroPercent",
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
    getCashBackTableDefs
}