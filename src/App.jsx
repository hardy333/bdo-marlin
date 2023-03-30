import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Swip from "./components/Swip";
import TableTest from "./components/TableTest";
import Dashboard from "./pages/Dashboard";
import "./styles/App.css";
import "./styles/scrollbars.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/s" element={<Swip />} />
        <Route path="/table-test" element={<TableTest />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
