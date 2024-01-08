import Tippy from "@tippyjs/react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const daysMap = {
  "S": "sunday",
  "M": "monday",
  "T": "tuesday",
  "W": "wednesday",
  "T": "thursday",
  "F": "friday",
  "S": "saturday"
}

const getDayFullname = (index) => {

  const daysMap = {
    "1": "monday",
    "2": "tuesday",
    "3": "wednesday",
    "4": "thursday",
    "5": "friday",
    "6": "saturday",
    "7": "sunday",

  }

  return daysMap[String(index)]
}

const calendarTableHeaderList = [
  {
    name: "shopName",
    showingName: "მაღაზია",
    isShowing: true,
  },
  {
    name: "shopAddress",
    showingName: "მისამართი",
    isShowing: true,
  },
  {
    name: "brand",
    showingName: "ბრენდი",
    isShowing: true,
  },
  {
    name: "Distributor's Date",
    showingName: "მოწოდების თარიღი",
    isShowing: true,
  },
];

const CalendarTableDefs = [
  {
    field: "shopName",
    headerName: "მაღაზია",
    width: 250,
    minWidth: 250,
    maxWidth: 250,
    cellRendererFramework: (params) => {
      return <div>Shop{String(params.value).padStart(3, "0")}</div>;
    },
  },
  {
    field: "shopAddress",
    headerName: "მისამართი",
    width: 220,
    maxWidth:220
  },
  {
    field: "brand",
    headerName: "ბრენდი",
    maxWidth: 250,
  },
  {
    field: "Distributor's Date",
    headerName: "მოწოდების თარიღი",
    cellRendererFramework: (params) => {

      let tooltipText = "ყოველ კვირა";

      if (params.data.weekInterval === 2) {
        tooltipText = "2 კვირაში ერთხელ";
      }

      console.log("Interval", params.data.weekInterval)

      return (
        <div className="dis-date-container">
          <div className="days-container">
            {days.map((dayFirstLetter, index) => (
              <span
                key={dayFirstLetter + index}
                style={{
                  color: params.data[getDayFullname(index + 1)] ? "#211543" : "#AE9EDC",
                }}
              >
                {dayFirstLetter}
              </span>
            ))}
          </div>
          <Tippy
            className="tooltip-1"
            arrow={false}
            placement="top"
            content={tooltipText}
          >
            <div className="circle-container">
              <span className={`circle active`}></span>
              <span
                className={`circle active ${params.data.weekInterval === 2 ? "stroked" : ""}`}
          
              ></span>
            </div>
          </Tippy>
        </div>
      );
    },
  },
];

export { CalendarTableDefs, calendarTableHeaderList };
