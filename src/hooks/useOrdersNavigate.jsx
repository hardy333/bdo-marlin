import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const statusColors = {
  გაგზავნილია: "#FFC23C",
  მიწოდებულია: "#01C6B5",
  პროცესშია: "#6E0FF5",
  დადასტურებულია: "#FF7BA7",
  გასაგზავნია: "#f55364",
};

// if (value === "გაგზავნილია") {
//   color = "#FFC23C";
// } else if (value === "მიწოდებულია") {
//   color = "#01C6B5";
// } else if (value === "პროცესშია") {
//   color = "#6E0FF5";
// } else if (value === "დადასტურებულია") {
//   color = "#FF7BA7";
// } else if (value === "გასაგზავნია") {
//   color = "#f55364";
// }

let orderId = "";
const statusUrlBase = "https://api.marlin.ge/api/StatusResultFront/";

const fetchStatusDetails = () => {
  const user = JSON.parse(window.localStorage.getItem("user"))

  
  console.log(orderId);
  return fetch(statusUrlBase + orderId, {
    headers: {'Authorization': `bearer ${user.token}`},

  }).then((res) => res.json());
};

const closeStatusCell = () => {};

const openStatusCell = () => {};

const navigateToDetailsPage = () => {};

const useOrdersNavigate = (gridApi, gridRef, setOpenedRowId) => {
  const {
    data: statusData,
    isLoading: statusIsLoading,
    isFetching: statusIsFetching,
    refetch: refetchStatus,
  } = useQuery({
    querykey: ["all-orders-status"],
    queryFn: fetchStatusDetails,
    enabled: false,
    cacheTime: 0,
  });

  const fetchStatusAndRender = async (cell, id) => {
    const statusContainer = cell.querySelector(".status-container");
    if (!statusContainer) return;
    // statusContainer.innerHTML = statusLoadingElement;

    orderId = id;
    statusContainer.innerHTML = "";
    const status = await refetchStatus();
    console.log(status.data.data);

    let statusCellInfo = "";

    status.data.data.forEach((obj) => {
      console.log(obj.statusName);
      statusCellInfo += `<li data-id="sss" style="color:${
        statusColors[obj.statusName]
      } !important;">${obj.statusName} - ${obj.date
        ?.split("T")[0]
        ?.split("-")
        .reverse()
        .join("/")} </li>`;
    });

    statusContainer.innerHTML = `<ul>${statusCellInfo}</ul>`;
  };

  useEffect(() => {
    const x = document.querySelector(
      ".all-orders-parent .ag-center-cols-container"
    );

    if (!x) return;

    const handleGridClick = (e) => {
      if (!e.target.classList.contains("ag-cell")) {
        const cell = e.target.closest(".ag-cell");

        cell.classList.remove("ag-cell--opened");
        setOpenedRowId(null);
        return;
      }
      const cell = e.target;
      const row = cell.closest(".ag-row");

      if (!row) return;

      const colName = cell.getAttribute("col-id");
      const rowId = +row.getAttribute("row-id");

      if (colName !== "status") {
        //  for navigation
        const shop = row.querySelector(".ag-cell[col-id='shop']").innerText;
        const date = row.querySelector(".ag-cell[col-id='date']").innerText;
        const scheduledDate = row.querySelector(
          ".ag-cell[col-id='scheduled']"
        ).innerText;
        const status = row.querySelector(
          ".ag-cell[col-id='status'] .ag-cell-status-value"
        ).innerText;
        const vendor = row.querySelector(".ag-cell[col-id='vendor']").innerText;
        const orderNumber = row.querySelector(
          ".ag-cell[col-id='number']"
        ).innerText;
        const amount = row
          .querySelector(".ag-cell[col-id='amount']")
          .innerText.replace("GEL", "");
        const invoiceAmount = row
          .querySelector(".ag-cell[col-id='invoiceAmount']")
          .innerText.replace("GEL", "");

        const orderID = row
          .querySelector(".ag-cell[col-id='vendor'] span")
          .getAttribute("data-order-id");

        const urlParams = new URLSearchParams();
        urlParams.append("shop", shop);
        urlParams.append("date", date);
        urlParams.append("scheduledDate", scheduledDate);
        urlParams.append("vendor", vendor);
        urlParams.append("status", status);
        urlParams.append("orderID", orderID);
        urlParams.append("amount", amount);
        urlParams.append("invoiceAmount", invoiceAmount);
        urlParams.append("orderNumber", orderNumber);

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

      const orderID = row
        .querySelector(".ag-cell[col-id='vendor'] span")
        .getAttribute("data-order-id");

      fetchStatusAndRender(cell, orderID);

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

export default useOrdersNavigate;
