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

import Error from "./pages/Error";

const Employees = React.lazy(() => import("./pages/Employees"));

import Profile from "./pages/Profile";
import Vendors from "./pages/vendors/Vendors";
import Invoices2 from "./pages/Invoices2";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Prices from "./pages/Prices";
import ProfileForm from "./components/ProfileForm";
import PasswordForm from "./components/PasswordForm";
import OrderDetails from "./pages/OrderDetails";
import Terms from "./pages/Terms";
import AllOrdersParent from "./pages/AllOrdersParent";
import LogsTable from "./pages/LogsTable";
import ReportsTable from "./pages/ReportsTable";
import CatalogueTable from "./pages/CatalogueTable";

//  lazy

import Contract from "./pages/Contract";
import VendorAllOrdersTable from "./pages/VendorAllOrdersTable";
import DiscountsCards from "./pages/DiscountsCards";
import VendorsCalendarTable from "./pages/VendorsCalendarTable";
import InvoiceDetailsTable from "./pages/InvoiceDetailsTable";
import DashboardLayout from "./layout/DashboardLayout";
import InvoicesTable from "./pages/InvoicesTable";
const Dash = React.lazy(() => import("./pages/Dash"));

import { QueryClient, QueryClientProvider } from "react-query";
import SlaByShops from "./pages/SlaByShops";
import SlaByItem from "./pages/SlaByItem";
import SlaByOrders from "./pages/SlaByOrders";
import SlaByCategory from "./pages/SlaByCategory";
import DiscountsTable2 from "./pages/DiscountsTable2";

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
            <Route path="/invoices-table" element={<InvoicesTable />} />

            <Route path="/invoice-details" element={<InvoiceDetailsTable />} />
            <Route
              path="/employees"
              element={
                <React.Suspense fallback={<h1>Loading ...</h1>}>
                  <Employees />
                </React.Suspense>
              }
            />
            <Route path="/invoices2" element={<Invoices2 />} />

            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/prices" element={<Prices />} />

            <Route path="/order-details" element={<OrderDetails />} />

            <Route path="/all-orders-parent" element={<AllOrdersParent />} />
            <Route path="/logs" element={<LogsTable />} />

            <Route path="/contract" element={<Contract />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/sla-by-shops" element={<SlaByShops />} />
            <Route path="/sla-by-item" element={<SlaByItem />} />
            <Route path="/sla-by-category" element={<SlaByCategory />} />
            <Route path="/sla-by-orders" element={<SlaByOrders />} />
            <Route path="/reports" element={<ReportsTable />} />

            <Route path="/discounts-table" element={<DiscountsTable2 />} />
            <Route path="/discounts-cards" element={<DiscountsCards />} />

            <Route path="/catalogue" element={<CatalogueTable />} />
            <Route
              path="/vendors-calendar"
              element={<VendorsCalendarTable />}
            />
            <Route
              path="/vendor-all-orders"
              element={<VendorAllOrdersTable />}
            />

            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
