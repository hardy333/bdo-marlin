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
import "./styles/info-badge.css";

import Employees from "./pages/Employees";
import Dash from "./pages/Dash";

import Error from "./pages/Error";
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

import Contract from "./pages/Contract";
import VendorAllOrdersTable from "./pages/VendorAllOrdersTable";
import DiscountsCards from "./pages/DiscountsCards";
import VendorsCalendarTable from "./pages/VendorsCalendarTable";
import InvoiceDetailsTable from "./pages/InvoiceDetailsTable";

import DashboardLayout from "./layout/DashboardLayout";
import InvoicesTable from "./pages/InvoicesTable";

import SlaByShops from "./pages/SlaByShops";
import SlaByItem from "./pages/SlaByItem";
import SlaByOrders from "./pages/SlaByOrders";
import SlaByCategory from "./pages/SlaByCategory";
import DiscountsTable2 from "./pages/DiscountsTable2";

import StableTable from "./pages/StableTable";
import ExpandableTable from "./pages/ExpandableTable";

import ColorsPage from "./pages/ColorsPage";

import { QueryClientProvider, QueryClient } from "react-query";
import Test from "./pages/Test";
import CashBackTable from "./pages/CashBackTable";
import CategoriesTable from "./pages/CategoriesTable";
import MTable from "./pages/MTable";
import CategoriesTable2 from "./pages/CategoriesTable2";
import SetPassword from "./pages/SetPassword";
import PasswordPage from "./pages/PasswordPage";
import AuthElement from "./components/AuthElement";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route element={<DashboardLayout />}>
          <Route
            path="/"
            element={
              <AuthElement>
                <Dash />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/colors-page"
            element={
              <AuthElement>
                <ColorsPage />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/mtable"
            element={
              <AuthElement>
                <MTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/password-page"
            element={
              <AuthElement>
                <PasswordPage />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/invoices-table"
            element={
              <AuthElement>
                <InvoicesTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/employees"
            element={
              <AuthElement>
                <Employees />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthElement>
                <Profile />{" "}
              </AuthElement>
            }
          >
            <Route
              index
              element={
                <AuthElement>
                  <ProfileForm />{" "}
                </AuthElement>
              }
            />
            <Route
              path="change-password"
              element={
                <AuthElement>
                  <PasswordForm />{" "}
                </AuthElement>
              }
            />
          </Route>
          <Route
            path="/stable-table"
            element={
              <AuthElement>
                <StableTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/expandable-table"
            element={
              <AuthElement>
                <ExpandableTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/invoice-details"
            element={
              <AuthElement>
                <InvoiceDetailsTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/test"
            element={
              <AuthElement>
                <Test />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/invoices2"
            element={
              <AuthElement>
                <Invoices2 />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/vendors"
            element={
              <AuthElement>
                <Vendors />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/prices"
            element={
              <AuthElement>
                <Prices />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/order-details"
            element={
              <AuthElement>
                <OrderDetails />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/all-orders-parent"
            element={
              <AuthElement>
                <AllOrdersParent />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/logs"
            element={
              <AuthElement>
                <LogsTable />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/contract"
            element={
              <AuthElement>
                <Contract />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/categories"
            element={
              <AuthElement>
                <CategoriesTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/terms"
            element={
              <AuthElement>
                <Terms />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/cash-back-table"
            element={
              <AuthElement>
                <CashBackTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/sla-by-shops"
            element={
              <AuthElement>
                <SlaByShops />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/sla-by-item"
            element={
              <AuthElement>
                <SlaByItem />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/sla-by-category"
            element={
              <AuthElement>
                <CategoriesTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/sla-by-category2"
            element={
              <AuthElement>
                <CategoriesTable2 />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/sla-by-orders"
            element={
              <AuthElement>
                <SlaByOrders />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/reports"
            element={
              <AuthElement>
                <ReportsTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/discounts-table"
            element={
              <AuthElement>
                <DiscountsTable2 />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/discounts-cards"
            element={
              <AuthElement>
                <DiscountsCards />{" "}
              </AuthElement>
            }
          />

          <Route
            path="/catalogue"
            element={
              <AuthElement>
                <CatalogueTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/vendors-calendar"
            element={
              <AuthElement>
                <VendorsCalendarTable />{" "}
              </AuthElement>
            }
          />
          <Route
            path="/vendor-all-orders"
            element={
              <AuthElement>
                <VendorAllOrdersTable />{" "}
              </AuthElement>
            }
          />

          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
