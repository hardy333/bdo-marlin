import ExcelDateToJSDate from "./utils/transformExcelDate";
import { format } from "date-fns";

export const COLUMNS_BY_ITEM = [
  {
    Header: "რიცხვი",
    accessor: "Number",
  },
  {
    Header: "პროდუქტი",
    accessor: "Item",
    disableSortBy: true,
  },
  {
    Header: "რაოდენობა",
    accessor: "Ordered",
  },
  {
    Header: "მოტანილი",
    accessor: "Delivered",
  },
  {
    Header: "დროულად",
    accessor: "In time",
  },
  {
    Header: "სერვისის დონე",
    accessor: "Service level",
  },
  {
    Header: "პროდუქტის კატეგორია",
    accessor: "Product Category",
  },
];

export const COLUMNS_BY_SHOP = [
  {
    Header: "რიცხვი",
    accessor: "Number",
  },
  {
    Header: "თარიღი",
    accessor: "Date",
    disableGlobalFilter: true,
    Cell: ({ value }) => {
      return format(ExcelDateToJSDate(value), "M/dd/yyyy");
    },
  },
  {
    Header: "რაოდენობა",
    accessor: "Amount",
    disableGlobalFilter: true,
  },
  {
    Header: "შეკვეთილი",
    accessor: "Ordered",
  },
  {
    Header: "მოტანილი",
    accessor: "Delivered",
  },
  {
    Header: "დროულად",
    accessor: "In time",
  },
  {
    Header: "სერვისის დონე",
    accessor: "Service level",
  },
  {
    Header: "მისამართი",
    accessor: "Address",
  },
];
