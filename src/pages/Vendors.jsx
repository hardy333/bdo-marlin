import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import VendorsCard from "../components/VendorsCard";

import searchSvg from "../assets/employees/search.svg";
import filterSvg from "../assets/filter.svg";
import listSortSvg from "../assets/list-sort.svg";

// css
import "../styles/vendors.css";

const Vendors = () => {
  return (
    <DashboardLayout>
      <section className="vendors">
        <header className="vendors-header">
          {/* 1 */}
          <div className="vendors-switch-container">
            <p>My Vendors</p>
            <div class="toggle-switch">
              <input class="toggle-input" id="toggle" type="checkbox" />
              <label class="toggle-label" for="toggle"></label>
            </div>
            <p>All Vendors</p>
          </div>
          {/* 2 */}
          <div className="vendors-btns-container">
            <button>
              <img src={filterSvg} alt="" />
            </button>
            <button>
              <img src={listSortSvg} alt="" />
            </button>
          </div>
          {/* 3 */}
          <div>
            <div className="input-wrapper">
              <input type="text" className="input" />
              <img src={searchSvg} alt="" />
            </div>
          </div>
        </header>

        <div className="vendors-card-container">
          <VendorsCard variant="purple" />
          <VendorsCard variant="purple" />
          <VendorsCard variant="purple" />
          <VendorsCard variant="purple" />
          <VendorsCard variant="purple" />
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
