const LogsTableDefs = [
    {
      field: "Transition ID",
    },
    {
      field: "Date",
    },
    {
      field: "Sender",
    },
    {
      field: "Receiver",
    },
    {
      field: "Document #",
    },
    {
      field: "Type",
      minWidth: 150,
    },
    {
      field: "Error Code",
      cellRendererFramework: (params) => {
        return (
          <div className="  logs-btn flex gap-10 justify-start p-2  ">
            <button
              style={{ height: 23, width: 23 }}
              className={`p-2 border-2  border-none flex justify-center items-center rounded-lg ${
                +params.value % 2 === 0 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {+params.value % 2 === 0 ? "E" : "S"}
            </button>
            <span>{params.value}</span>
          </div>
        );
      },
    },
  ]



// const logsTableHeaderList = 



export {
    LogsTableDefs, 
    // logsTableHeaderList
}