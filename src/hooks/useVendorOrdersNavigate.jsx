import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useVendorOrdersNavigate = (gridApi, gridRef, setOpenedRowId) => {
  useEffect(() => {
    const x = document.querySelector(
      ".vendors-all-orders-table .ag-center-cols-container"
    );

    if (!x) return;

    const handleGridClick = (e) => {
      const cell = e.target;
      const row = cell.closest(".ag-row");
      if (!row) return;

      const colName = cell.getAttribute("col-id");
      const rowId = +row.getAttribute("row-id");

      if (colName !== "status") {
        //  for navigation
        const shop = row.querySelector(".ag-cell[col-id='shop']").innerText;
        const scheduledDate = row.querySelector(
          ".ag-cell[col-id='scheduled']"
        ).innerText;
        const status = row.querySelector(
          ".ag-cell[col-id='status'] .ag-cell-status-value"
        ).innerText;
        let vendor = row.querySelector(".ag-cell[col-id='vendor']")?.innerText;
        vendor = "GDM";
        const amount = row
          .querySelector(".ag-cell[col-id='amount']")
          .innerText.replace("GEL", "");

        const orderID = row
          .querySelector(".ag-cell[col-id='shop'] span")
          .getAttribute("data-order-id");
        const date = row
          .querySelector(".ag-cell[col-id='shop'] span")
          .getAttribute("data-date")?.split(" ")[0].split("-").reverse().join("/");

        let invoiceAmount = row
          .querySelector(".ag-cell[col-id='shop'] span")
          .getAttribute("data-invoice-amount");

          if(!invoiceAmount){
            invoiceAmount = ""
          }

        const urlParams = new URLSearchParams();
        urlParams.append("shop", shop);
        urlParams.append("date", date);
        urlParams.append("scheduledDate", scheduledDate);
        urlParams.append("vendor", vendor);
        urlParams.append("status", status);
        urlParams.append("orderID", orderID);
        urlParams.append("amount", amount);
        urlParams.append("invoiceAmount", invoiceAmount);

        navigate("/order-details?" + urlParams.toString());
      }

      const prevOpenedCell = document.querySelector(
        ".all-orders-parent .ag-cell--opened"
      );

      if (prevOpenedCell) {
        prevOpenedCell.classList.remove("ag-cell--opened");
      }

      if (prevOpenedCell !== cell) {
        cell.classList.add("ag-cell--opened");
      }

      setOpenedRowId((currOpenedRowId) => {
        if (currOpenedRowId === rowId) {
          return null;
        } else {
          return rowId;
        }
      });
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  }, [gridApi, gridRef]);

  const navigate = useNavigate();
};

export default useVendorOrdersNavigate;