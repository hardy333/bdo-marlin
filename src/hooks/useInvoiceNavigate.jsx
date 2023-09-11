import { useEffect } from "react";
import { useNavigate } from "react-router";

const useInvoiceNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const x = document.querySelector(".invoices-table .ag-body");
    if (!x) return;

    const handleGridClick = (e) => {
      const cell = e.target;
      const row = cell.closest(".ag-row");
      if(!row) return
      
      const invoiceIdSpan = row.querySelector("#invoice-id-span")
      
      const invoiceID = invoiceIdSpan.getAttribute("data-invoice-id")

      const waybillNumber = invoiceIdSpan.getAttribute("data-waybill-number")
      const orderNumber = invoiceIdSpan.getAttribute("data-order-number")
      const orderID = invoiceIdSpan.getAttribute("data-order-id")

      const invoiceNumber = invoiceIdSpan.getAttribute("data-invoice-number")
      const invoiceAmount = invoiceIdSpan.getAttribute("data-invoice-amount")
      const amount = invoiceIdSpan.getAttribute("data-amount")

      const vendor = invoiceIdSpan.getAttribute("data-vendor")
      const shop = invoiceIdSpan.getAttribute("data-shop")
      const date = invoiceIdSpan.getAttribute("data-date")



      //  for navigation
    //   const shop = row.querySelector(".ag-cell[col-id='shop']").innerText;
    //   const date = row.querySelector(".ag-cell[col-id='date']").innerText;
    //   const status = row.querySelector(
    //     ".ag-cell[col-id='status'] .ag-cell-status-value"
    //   ).innerText;
    //   const vendor = row.querySelector(".ag-cell[col-id='vendor']").innerText;

    //   const orderID = row
    //     .querySelector(".ag-cell[col-id='vendor'] span")
    //     .getAttribute("data-order-id");

      const urlParams = new URLSearchParams();
      urlParams.append("waybillNumber", waybillNumber);
      urlParams.append("orderNumber", orderNumber);
      urlParams.append("orderID", orderID);
      urlParams.append("date", date);
      urlParams.append("vendor", vendor);
      urlParams.append("shop", shop);
      urlParams.append("invoiceNumber", invoiceNumber);
      urlParams.append("invoiceID", invoiceID);
      urlParams.append("invoiceAmount", invoiceAmount);
      urlParams.append("amount", amount);

      navigate("/invoice-details?" + urlParams.toString());
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  });
};

export default useInvoiceNavigate;
