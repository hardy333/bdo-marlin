import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import VendorsCard from "../components/VendorsCard";

import searchSvg from "../assets/employees/search.svg";
import filterSvg from "../assets/filter.svg";
import listSortSvg from "../assets/list-sort.svg";

// css
import "../styles/vendors.css";
import SearchSvg from "../components/svgs/SearchSvg";

const Vendors = () => {
  return (
    <DashboardLayout>
      <section className="vendors">
        <header className="vendors-header">
          {/* 1 */}
          <div className="vendors-switch-container">
            <p>My Vendors</p>
            <div className="toggle-switch">
              <input className="toggle-input" id="toggle" type="checkbox" />
              <label className="toggle-label" htmlFor="toggle"></label>
            </div>
            <p>All Vendors</p>
          </div>
          {/* 2 */}
          {/* <div className="vendors-btns-container">
            <button>
              <img src={filterSvg} alt="" />
            </button>
            <button>
              <img src={listSortSvg} alt="" />
            </button>
          </div> */}
          {/* 3 */}
          <div>
            <div className="input-wrapper">
              <input type="text" className="input" />
              <SearchSvg />
            </div>
          </div>
        </header>

        <div className="vendors-card-container">
          <VendorsCard variant="active" />
          <VendorsCard variant="active" />
          <VendorsCard variant="active" />
          <VendorsCard variant="active" />
          <VendorsCard variant="active" />
          <VendorsCard variant="active" />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
          <VendorsCard />
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
      </section>
    </DashboardLayout>
  );
};

export default Vendors;
