import Tippy from "@tippyjs/react";

const days = ["M", "T", "W", "T", "F", "S", "S"];


const calendarTableHeaderList = [
  {
    name: "Shop",
    isShowing: true,
  },
  {
    name: "Shop Address",
    isShowing: true,
  },
  {
    name: "Vendor",
    isShowing: true,
  },
  {
    name: "Brand",
    isShowing: true,
  },
  {
    name: "Dis Date",
    isShowing: true,
  },
];

const CalendarTableDefs = [
  {
    field: "Shop",
    headerName: "მაღაზია",
    width: 120,
    minWidth: 120,
    maxWidth: 150,
    cellRendererFramework: (params) => {
      return <div>Shop{String(params.value).padStart(3, "0")}</div>;
    },
  },
  {
    field: "Shop Address",
    headerName: "მისამართი",
    maxWidth: 200,
  },
  {
    field: "Vendor",
    headerName: "მომწოდებელი",
    maxWidth: 180,
  },
  {
    field: "Brand",
    headerName: "ბრენდი",
    maxWidth: 180,
  },
  {
    field: "Distributor's Date",
    headerName: "მოწოდების თარიღი",
    cellRendererFramework: (params) => {
      const d1 = Math.floor(Math.random() * 6);
      const d2 = Math.floor(Math.random() * 6);

      let isTwo = false;
      let tooltipText = "ყველ კვირა";

      if (Math.random() - 0.5 > 0) {
        isTwo = true;
        tooltipText = "2 კვირაში ერთხელ";
      }

      return (
        <div className="dis-date-container">
          <div className="days-container">
            {days.map((d, index) => (
              <span
                key={d + index}
                style={{
                  color: d1 === index || d2 == index ? "#211543" : "#AE9EDC",
                }}
              >
                {d}
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
                className={`circle ${isTwo ? "active stroked" : ""}`}
                style={{ display: isTwo ? "block" : "none" }}
              ></span>
            </div>
          </Tippy>
        </div>
      );
    },
  },
];

export { CalendarTableDefs, calendarTableHeaderList };
