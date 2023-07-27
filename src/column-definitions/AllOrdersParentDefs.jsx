const allOrdersParentDefs = [
 
  {
    field: "date",
    headerName: "თარიღი",
    cellRenderer: (params) => {
      
      const { value } = params;

      return value.split(" ")[0].split("-").reverse().join("/");
    },
  },
  {
    field: "shop",
    headerName: "მაღაზია",
    // hide: true, 
    cellRenderer: (params) => {
      const { value } = params;
      return value;
    },
  },

  {
    field: "vendor",
    headerName: "მომწოდებელი",
    cellRenderer: (params) => {
      const { value } = params;
      return <span data-order-id={params.data.orderID}>{value}</span>;
    },
  },
  {
    field: "amount",
    headerName: "თანხა",
    valueType: "number",
    cellRenderer: (params) => {
      const { value } = params;
      return value + " GEL";
    },
  },
  {
    field: "scheduled",
    headerName: "გეგმიური მიწოდება",
    cellRenderer: (params) => {
      const { value } = params;
      return "06/10/2023";
    },
  },
  {
    field: "status",
    headerName: "სტატუსი",

    minWidth: 190,
    maxWidth: 200,
    cellRenderer: (params) => {
      const { value } = params;
      let color = "";

      if (value === "გაგზავნილია") {
        color = "#FFC23C";
      } else if (value === "მიწოდებულია") {
        color = "#01C6B5";
      } else if (value === "პროცესშია") {
        color = "#6E0FF5";
      } else if (value === "დადასტურებულია") {
        color = "#FF7BA7";
      }else if (value === "გასაგზავნია"){
        color = "#f55364"
      }

      return (
        <>
          <span
            className="ag-cell-status-value"
            style={{ pointerEvents: "none", color }}
          >
            {value}
          </span>
          <div
            className="status-container"
            style={{ pointerEvents: "none", "--status-color": color }}
          >
            <ul>
              <li style={{ color }}>{value}</li>
              <li>მუშავდება 11:06, 2/10/2023</li>
              <li>პროცესშია 11:06, 2/10/2023</li>
              <li>გაიგზავნა 11:06, 2/10/2023</li>
            </ul>
          </div>
        </>
      );
    },

    cellStyle: (params) => {
      if (params.value % 3 === 0) {
        return {
          color: "#FFC23C",
        };
      } else if (params.value % 3 === 1) {
        return {
          color: "#6E0FF5",
        };
      } else {
        return {
          color: "#01C6B5",
        };
      }
    },
  },
  {
    field: "invoiceAmount",
    headerName: "ინვოისის თანხა",

    cellRenderer: (params) => {
      let show = true
      if(Math.random() - 0.4 < 0){
        show = false
      }
      
      return show ? Math.floor(Math.random() * 1060 + 40) + " GEL" :  "";
    },
  },
  {
    field: "serviceLevel",
    headerName: "სერვისის დონე",
    cellRenderer: (params) => {
      const { value } = params;
      return Math.floor(Math.random() * 60 + 40) + "%";
    },
  },
  {
    field: "orderID",
    headerName: "orderID",
    show: false,
    hide: true,
  },
];

export const allOrdersParentHeaderList = [
    {
      name: "shop",
      showingName: "მაღაზია",
      isShowing: true

    },
    {
      name: "date",
      showingName: "თარიღი",
      isShowing: true

    },

    {
      name: "vendor",
      showingName: "მომწოდებელი",
      isShowing: true

    },
    {
      name: "amount",
      showingName: "თანხა",
      isShowing: true

    },
    {
      name: "scheduled",
      showingName: "გეგმიური მიწოდება",
      isShowing: true

    },
    {
      name: "status",
      showingName: "სტატუსი",
      isShowing: true

      },

    {
      name: "serviceLevel",
      showingName: "სერვისის დონე",
      isShowing: true
      
    },
   
  ]


export default allOrdersParentDefs;
