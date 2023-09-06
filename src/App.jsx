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

import Employees from "./pages/Employees";
// import Dash from "./pages/Dash";
const Dash = React.lazy(() => import("./pages/Dash"));

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
const VendorsCalendarTable = React.lazy(() =>
  import("./pages/VendorsCalendarTable")
);
const InvoiceDetailsTable = React.lazy(() =>
  import("./pages/InvoiceDetailsTable")
);
const VendorAllOrdersTable = React.lazy(() =>
  import("./pages/VendorAllOrdersTable")
);
const AllOrdersParent = React.lazy(() => import("./pages/AllOrdersParent"));
const LogsTable = React.lazy(() => import("./pages/LogsTable"));
const ReportsTable = React.lazy(() => import("./pages/ReportsTable"));
const CatalogueTable = React.lazy(() => import("./pages/CatalogueTable"));
const OrderDetails = React.lazy(() => import("./pages/OrderDetails"));
const Invoices2 = React.lazy(() => import("./pages/Invoices2"));
const CashBackTable = React.lazy(() => import("./pages/CashBackTable"));
const CategoriesTable = React.lazy(() => import("./pages/CategoriesTable"));
const DiscountsTable2 = React.lazy(() => import("./pages/DiscountsTable2"));
const StableTable = React.lazy(() => import("./pages/StableTable"));
const InvoicesTable = React.lazy(() => import("./pages/InvoicesTable"));
const SlaByShops = React.lazy(() => import("./pages/SlaByShops"));
const SlaByItem = React.lazy(() => import("./pages/SlaByItem"));
const SlaByOrders = React.lazy(() => import("./pages/SlaByOrders"));
// Table Pages END

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="landing" element={<Landing />} />

        <Route element={<AuthElement />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<p>Loading...</p>}>
                  <Dash />
                </Suspense>
              }
            />

            {/* Table Pages   */}
            <Route
              element={
                <Suspense fallback={<p>Loading, Loading...</p>}>
                  <Outlet />
                </Suspense>
              }
            >
              <Route path="/invoices-table" element={<InvoicesTable />} />
              <Route path="/stable-table" element={<StableTable />} />
              <Route
                path="/invoice-details"
                element={<InvoiceDetailsTable />}
              />
              <Route path="/invoices2" element={<Invoices2 />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/all-orders-parent" element={<AllOrdersParent />} />
              <Route path="/logs" element={<LogsTable />} />
              <Route path="/categories" element={<CategoriesTable />} />
              <Route path="/cash-back-table" element={<CashBackTable />} />
              <Route path="/sla-by-shops" element={<SlaByShops />} />
              <Route path="/sla-by-item" element={<SlaByItem />} />
              <Route path="/sla-by-category" element={<CategoriesTable />} />
              <Route path="/sla-by-orders" element={<SlaByOrders />} />
              <Route path="/reports" element={<ReportsTable />} />
              <Route path="/discounts-table" element={<DiscountsTable2 />} />
              <Route path="/catalogue" element={<CatalogueTable />} />
              <Route
                path="/vendors-calendar"
                element={<VendorsCalendarTable />}
              />
              <Route
                path="/vendor-all-orders"
                element={<VendorAllOrdersTable />}
              />
            </Route>

            {/* Table Pages End */}

            <Route path="/employees" element={<Employees />} />
            <Route path="/colors-page" element={<ColorsPage />} />
            <Route path="/password-page" element={<PasswordPage />} />
            <Route path="/discounts-cards" element={<DiscountsCards />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route path="/vendors" element={<Vendors />} />

            <Route path="/*" element={<Error />} />
          </Route>{" "}
          {/* Dashboard Layout End */}
        </Route>
        {/* Auth Element End */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
