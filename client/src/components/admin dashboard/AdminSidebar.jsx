import React from "react";
import {
  Shield,
  BarChart3,
  Users,
  CreditCard,
  PieChart,
  UserCheck,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    localStorage.clear();
  }

  return (
    <div className="flex gap-3 flex-col px-6 py-8 w-[22%] max-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 shadow-xl border-r border-slate-200/50 backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield size={20} className="text-white" />
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
        <p className="text-slate-600 text-sm mt-2 font-medium">Administrator</p>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        <NavLink
          to=""
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <BarChart3 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="tansaction-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <CreditCard size={18} />
          Transaction Oversight
        </NavLink>
        <NavLink
          to="budget-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <PieChart size={18} />
          Budget Monitoring
        </NavLink>
        <NavLink
          to="user-management"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <Users size={18} />
          User Management
        </NavLink>
        <NavLink
          to="permissions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <UserCheck size={18} />
          Roles and Permissions
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105 shadow-purple-500/25"
                : "text-slate-700 hover:bg-white/70 hover:text-slate-900 hover:translate-x-1 hover:shadow-md bg-white/30 backdrop-blur-sm border border-white/40"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>

      <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-300/50">
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-4 py-3 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 transform shadow-blue-500/25"
          onClick={() => navigate("/")}
        >
          <Home size={16} />
          Home
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-4 py-3 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 transform shadow-red-500/25"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
