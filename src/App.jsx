import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "./styles/scrollbars.css";
import "./styles/aside.css";
import "./styles/modal.css";
import "./styles/react-select.css";
import "./styles/page-geo.css";
import "./styles/column-toggle-popup.css";
import "./styles/date-menu.css";
import "./styles/catalogue-menu.css";
import "./styles/tippy.css";
import "./styles/components.css";
import "./styles/report-child-table.css";
import "./styles/date-range-picker-one.css";
import "./styles/date-picker.css";
import "./styles/floating-filter.css";
import "./styles/table-global.css";
import "./styles/switch.css";
import "./styles/info-badge.css";
import "./styles/copy-paste-table.css";

import Employees from "./pages/Employees";
import Dash from "./pages/Dash";
// const Dash = React.lazy(() => import("./pages/Dash"));

import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Vendors from "./pages/vendors/Vendors";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Prices from "./pages/Prices";
import ProfileForm from "./components/ProfileForm";
import PasswordForm from "./components/PasswordForm";
import Terms from "./pages/Terms";

import Contract from "./pages/Contract";
import DiscountsCards from "./pages/DiscountsCards";

import DashboardLayout from "./layout/DashboardLayout";

// import SlaByCategory from "./pages/SlaByCategory";
// import CategoriesTable2 from "./pages/CategoriesTable2";

// import ExpandableTable from "./pages/ExpandableTable";

import ColorsPage from "./pages/ColorsPage";

import { QueryClientProvider, QueryClient } from "react-query";
// import Test from "./pages/Test";
import SetPassword from "./pages/SetPassword";
import PasswordPage from "./pages/PasswordPage";
import AuthElement from "./components/AuthElement";
import Landing from "./pages/landing/Landing";

// Table Pages Start
import VendorsCalendarTable from "./pages/VendorsCalendarTable";
import InvoiceDetailsTable from "./pages/InvoiceDetailsTable";
import VendorAllOrdersTable from "./pages/VendorAllOrdersTable";
import AllOrdersParent from "./pages/AllOrdersParent";
import LogsTable from "./pages/LogsTable";
import ReportsTable from "./pages/ReportsTable";
import CatalogueTable from "./pages/CatalogueTable";
import OrderDetails from "./pages/OrderDetails";
import Invoices2 from "./pages/Invoices2";
import CashBackTable from "./pages/CashBackTable";
import CategoriesTable from "./pages/CategoriesTable";
import DiscountsTable2 from "./pages/DiscountsTable2";
import StableTable from "./pages/StableTable";
import InvoicesTable from "./pages/InvoicesTable";
import SlaByShops from "./pages/SlaByShops";
import SlaByItem from "./pages/SlaByItem";
import SlaByOrders from "./pages/SlaByOrders";
import { useAuthContext } from "./hooks/useAuthContext";
import Retailers from "./vendorPages/retailers/Retailers";
import VendorAllOrders from "./vendorPages/allOrders/VendorAllOrders";
import RetroBonuses from "./vendorPages/retroBonuses/RetroBonuses";
import RetailerRoutesProtection from "./components/RetailerRoutesProtection";
import SupplierRoutesProtection from "./components/SupplierRoutesProtection";
import VendorRetroBonusTable from "./vendorPages/retroBonuses/VendorRetroBonuseTable";
import VendorOrderDetails from "./vendorPages/orderDetails/VendorOrderDetails";
import VendorInvoices from "./vendorPages/invoices/VendorInvoices";
import VendorsCatalogue from "./vendorPages/catalogue/VendorsCatalogue";
import CalendarTableForVendor from "./vendorPages/calendarTable/CalendarTableForVendor";
// Table Pages END

const queryClient = new QueryClient();

function App() {
  const { user } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="landing" element={<Landing />} />

        <Route element={<AuthElement />}>
          <Route element={<DashboardLayout />}>
            {/* Non Protected Routes Start */}
            <Route path="/" element={<Dash />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route path="/terms" element={<Terms />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/sla-by-shops" element={<SlaByShops />} />
            <Route path="/sla-by-item" element={<SlaByItem />} />
            <Route path="/sla-by-category" element={<CategoriesTable />} />
            <Route path="/sla-by-orders" element={<SlaByOrders />} />
            <Route path="/reports" element={<ReportsTable />} />
            <Route path="/logs" element={<LogsTable />} />
            <Route
                path="/vendors-calendar"
                element={<VendorsCalendarTable />}
              />
              <Route path="/employees" element={<Employees />} />
            {/* Non Protected Routes End */}

            <Route element={<RetailerRoutesProtection />}>
              {/* Table Pages   */}
              <Route path="/invoices-table" element={<InvoicesTable />} />
              <Route path="/stable-table" element={<StableTable />} />
              <Route
                path="/invoice-details"
                element={<InvoiceDetailsTable />}
              />
              <Route path="/invoices2" element={<Invoices2 />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/all-orders-parent" element={<AllOrdersParent />} />
              <Route path="/categories" element={<CategoriesTable />} />
              <Route path="/cash-back-table" element={<CashBackTable />} />

              <Route path="/discounts-table" element={<DiscountsTable2 />} />
              <Route path="/catalogue" element={<CatalogueTable />} />
            
              <Route
                path="/vendor-all-orders"
                element={<VendorAllOrdersTable />}
              />
              {/* Table Pages End */}
              <Route path="/colors-page" element={<ColorsPage />} />
              <Route path="/password-page" element={<PasswordPage />} />
              <Route path="/discounts-cards" element={<DiscountsCards />} />

              <Route path="/prices" element={<Prices />} />

              <Route path="/vendors" element={<Vendors />} />
            </Route>
            {/* Retailer protected route end  */}

            <Route path="/*" element={<Error />} />
            {/* Vendors */}
            {/* Vendors */}
            {/* Vendors */}

            <Route element={<SupplierRoutesProtection />}>
              <Route path="/retailers" element={<Retailers />} />
              <Route
                path="/vendor-all-orders-vendor"
                element={<VendorAllOrders />}
              />
              <Route path="vendor-order-details" element={<VendorOrderDetails />}/>
              <Route path="/vendor-retro-bonuses" element={<RetroBonuses />} />
              <Route path="/vendor-invoices" element={<VendorInvoices />} />
              <Route path="/vendor-catalogue" element={<VendorsCatalogue />} />
              <Route path="/calendar-table-for-vendor" element={<CalendarTableForVendor />} />
              <Route path="/vendor-retro-bonuse-table" element={<VendorRetroBonusTable />} />
            </Route>
          </Route>
          {/* Dashboard Layout End */}
        </Route>
        {/* Auth Element End */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
