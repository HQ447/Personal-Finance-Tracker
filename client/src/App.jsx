import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Overview from "./components/user dashboard/Overview";
import Transaction from "./components/user dashboard/Transaction";
import Budget from "./components/user dashboard/Budget";
import Analytics from "./components/admin dashboard/Analytics";
import UsersTransactions from "./components/admin dashboard/UsersTransactions";
import UsersBudgets from "./components/admin dashboard/UsersBudgets";
import Permissions from "./components/admin dashboard/Permissions";
import Settings from "./components/admin dashboard/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import UsersManagement from "./components/admin dashboard/UsersManagement";
import Profile from "./components/user dashboard/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<Analytics />} />
            <Route path="user-management" element={<UsersManagement />} />
            <Route
              path="tansaction-management"
              element={<UsersTransactions />}
            />
            <Route path="budget-management" element={<UsersBudgets />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="user-dashboard" element={<UserDashboard />}>
            <Route index element={<Overview />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="budget" element={<Budget />} />
            <Route path="profile-settings" element={<Profile />} />
          </Route>
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
