import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import searchSvg from "../assets/employees/search.svg";
import InvoiceCard2 from "../components/InvoiceCard2";

const Invoices2 = () => {
  return (
    <DashboardLayout>
      <header className="invoices-header">
        <h1>Invoices</h1>

        <div>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <img src={searchSvg} alt="" />
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
    </DashboardLayout>
  );
};

export default Invoices2;
