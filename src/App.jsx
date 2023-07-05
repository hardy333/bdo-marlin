import React from "react";
import { Route, Routes } from "react-router-dom";
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
import "./styles/lazy-loader-1.css";

// Hello

const Employees = React.lazy(() => import("./pages/Employees"));
const Dash = React.lazy(() => import("./pages/Dash"));

const Error = React.lazy(() => import("./pages/Error"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Vendors = React.lazy(() => import("./pages/vendors/Vendors"));
const Invoices2 = React.lazy(() => import("./pages/Invoices2"));

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Prices = React.lazy(() => import("./pages/Prices"));
const ProfileForm = React.lazy(() => import("./components/ProfileForm"));
const PasswordForm = React.lazy(() => import("./components/PasswordForm"));
const OrderDetails = React.lazy(() => import("./pages/OrderDetails"));
const Terms = React.lazy(() => import("./pages/Terms"));
const AllOrdersParent = React.lazy(() => import("./pages/AllOrdersParent"));
const LogsTable = React.lazy(() => import("./pages/LogsTable"));
const ReportsTable = React.lazy(() => import("./pages/ReportsTable"));
const CatalogueTable = React.lazy(() => import("./pages/CatalogueTable"));

//  lazy

const Contract = React.lazy(() => import("./pages/Contract"));
const VendorAllOrdersTable = React.lazy(() =>
  import("./pages/VendorAllOrdersTable")
);
const DiscountsCards = React.lazy(() => import("./pages/DiscountsCards"));
const VendorsCalendarTable = React.lazy(() =>
  import("./pages/VendorsCalendarTable")
);
const InvoiceDetailsTable = React.lazy(() =>
  import("./pages/InvoiceDetailsTable")
);
const DashboardLayout = React.lazy(() => import("./layout/DashboardLayout"));
const InvoicesTable = React.lazy(() => import("./pages/InvoicesTable"));

const SlaByShops = React.lazy(() => import("./pages/SlaByShops"));
const SlaByItem = React.lazy(() => import("./pages/SlaByItem"));
const SlaByOrders = React.lazy(() => import("./pages/SlaByOrders"));
const SlaByCategory = React.lazy(() => import("./pages/SlaByCategory"));
const DiscountsTable2 = React.lazy(() => import("./pages/DiscountsTable2"));

const StableTable = React.lazy(() => import("./pages/StableTable"));
const ExpandableTable = React.lazy(() => import("./pages/ExpandableTable"));

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Dash />
                </React.Suspense>
              }
            />
            <Route
              path="/invoices-table"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <InvoicesTable />
                </React.Suspense>
              }
            />
            <Route
              path="/employees"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Employees />
                </React.Suspense>
              }
            />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route
              path="/stable-table"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <StableTable />
                </React.Suspense>
              }
            />
            <Route
              path="/expandable-table"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <ExpandableTable />
                </React.Suspense>
              }
            />
            <Route
              path="/invoice-details"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <InvoiceDetailsTable />
                </React.Suspense>
              }
            />

            <Route
              path="/invoices2"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Invoices2 />
                </React.Suspense>
              }
            />

            <Route
              path="/vendors"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Vendors />
                </React.Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Register />
                </React.Suspense>
              }
            />

            <Route
              path="/prices"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Prices />
                </React.Suspense>
              }
            />

            <Route
              path="/order-details"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <OrderDetails />
                </React.Suspense>
              }
            />

            <Route
              path="/all-orders-parent"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <AllOrdersParent />
                </React.Suspense>
              }
            />
            <Route
              path="/logs"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <LogsTable />
                </React.Suspense>
              }
            />

            <Route
              path="/contract"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Contract />
                </React.Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Terms />
                </React.Suspense>
              }
            />

            <Route
              path="/sla-by-shops"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <SlaByShops />
                </React.Suspense>
              }
            />
            <Route
              path="/sla-by-item"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <SlaByItem />
                </React.Suspense>
              }
            />
            <Route
              path="/sla-by-category"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <SlaByCategory />
                </React.Suspense>
              }
            />
            <Route
              path="/sla-by-orders"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <SlaByOrders />
                </React.Suspense>
              }
            />
            <Route
              path="/reports"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <ReportsTable />
                </React.Suspense>
              }
            />

            <Route
              path="/discounts-table"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <DiscountsTable2 />
                </React.Suspense>
              }
            />
            <Route
              path="/discounts-cards"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <DiscountsCards />
                </React.Suspense>
              }
            />

            <Route
              path="/catalogue"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <CatalogueTable />
                </React.Suspense>
              }
            />
            <Route
              path="/vendors-calendar"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <VendorsCalendarTable />
                </React.Suspense>
              }
            />
            <Route
              path="/vendor-all-orders"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <VendorAllOrdersTable />
                </React.Suspense>
              }
            />

            <Route
              path="/*"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Error />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
