import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import VendorsCard from "../components/VendorsCard";

// css
import "../styles/vendors.css";

const Vendors = () => {
  return (
    <DashboardLayout>
      <section className="vendors">
        <header className="vendors-header">
          {/* 1 */}
          <div></div>
          {/* 2 */}
          <div></div>
          {/* 3 */}
          <div>
            <h1>Vendors</h1>
          </div>
        </header>

        <div className="vendors-card-container">
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Vendors;
