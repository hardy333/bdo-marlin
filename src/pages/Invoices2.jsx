import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import InvoiceCard2 from "../components/InvoiceCard2";
import SearchSvg from "../components/svgs/SearchSvg";

const Invoices2 = () => {
  return (
    <DashboardLayout>
      <header className="invoices-header">
        <h1>Invoices</h1>

        <div>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </div>
      </header>

      <div className="invoices-card-container">
        <InvoiceCard2 paidStatus="To be paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
        <InvoiceCard2 paidStatus="Paid" />
      </div>
      <div className="employee-pag-container">
        <button>&larr;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>&rarr;</button>

        <div className="employees-page-info">
          <p>1-5 of 5</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Invoices2;
