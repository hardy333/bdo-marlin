import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Swip from "./components/Swip";
import TableTest from "./components/TableTest";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";
import "./styles/scrollbars.css";
import "./styles/aside.css";
import "./styles/components.css";

import TableSettingsContextProvider from "./context/TableSettingsContext";
import AllOrders from "./pages/AllOrders";
import Hello from "./pages/Hello";
import AgTable from "./pages/AgTable";
import Error from "./pages/Error";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import Vendors from "./pages/Vendors";
import Invoices1 from "./pages/Invoices1";
import Invoices2 from "./pages/Invoices2";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prices from "./pages/Prices";
import MainDashboard from "./pages/MainDashboard";
import ProfileForm from "./components/ProfileForm";
import PasswordForm from "./components/PasswordForm";
// import TableSettings from "./components/TableSettings";
// import settings from "../s"

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <TableSettingsContextProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/s" element={<Swip />} />
            <Route path="/table-test" element={<TableTest />} />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/hello" element={<Hello />} />
            <Route path="/ag-table" element={<AgTable />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="change-password" element={<PasswordForm />} />
            </Route>
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/invoices1" element={<Invoices1 />} />
            <Route path="/invoices2" element={<Invoices2 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/main-dashboard" element={<MainDashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </QueryClientProvider>
      </TableSettingsContextProvider>
    </>
  );
}

export default App;
