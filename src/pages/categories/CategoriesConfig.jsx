export const categoriesHeaders = [
  {
    name: "productCategory",
    showingName: "კატეგორია",
    isShowing: true,
  },
  {
    name: "orderedQuantity",
    showingName: "შეკვეთილი რაოდენობა",
    isShowing: true,
  },
  {
    name: "orderedAmount",
    showingName: "შეკვეთილი თანხა",
    isShowing: true,
  },
  {
    name: "slaByQuantity",
    showingName: "SL. რაოდენობა",
    isShowing: true,
  },
  {
    name: "slaByAmount",
    showingName: "SL. თანხით",
    isShowing: true,
  },
  {
    name: "inTimeOrders",
    showingName: "დროულობა",
    isShowing: true,
  },
];

export const categoriesColumnDefs = [
  {
    field: "productCategory",
    headerName: "კატეგორია",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span className="plus-minus-span">+</span>
          <span>{value}</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
  {
    field: "orderedQuantity",
    headerName: "შეკვეთილი რაოდენობა",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span>{value}</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
  {
    field: "orderedAmount",
    headerName: "შეკვეთის თანხა",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span>{value} GEL</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
  {
    field: "slaByQuantity",
    headerName: "SL. რაოდენობით",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span>{value}</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
  {
    field: "slaByAmount",
    headerName: "SL. თანხით",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span>{value} GEL</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
  {
    field: "inTimeOrders",
    headerName: "დროულობა",
    cellRenderer: (props) => {
      const { value } = props;
      return (
        <div>
          <span>{value} %</span>
          <div className="custom-col-container"></div>
        </div>
      );
    },
  },
];
