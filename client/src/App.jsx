import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Overview from "./components/user dashboard/Overview";
import Transaction from "./components/user dashboard/Transaction";
import Budget from "./components/user dashboard/Budget";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="user-dashboard" element={<UserDashboard />}>
            <Route index element={<Overview />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="budget" element={<Budget />} />
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
