import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Swip from "./components/Swip";
import TableTest from "./components/TableTest";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";
import "./styles/scrollbars.css";
import TableSettingsContextProvider from "./context/TableSettingsContext";
import TableSettings from "./components/TableSettings";
// import settings from "../s"

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <TableSettingsContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/s" element={<Swip />} />
          <Route path="/table-test" element={<TableTest />} />
          {/* <Route path="/table-settings" element={<TableSettings />} /> */}
        </Routes>
      </QueryClientProvider>
    </TableSettingsContextProvider>
    </>

  );
}

export default App;
