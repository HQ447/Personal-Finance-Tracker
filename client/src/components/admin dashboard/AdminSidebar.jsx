import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="flex gap-3 flex-col px-4 py-6 w-[20%] max-h-screen shadow-2xl">
      <div className="mb-4">
        <h1 className="font-bold text-lg bg-gradient-to-r from-emerald-700 to-blue-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 mt-1"></div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to=""
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="user-management"
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          User Managment
        </NavLink>
        <NavLink
          to="tansaction-management"
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          Transaction Oversight
        </NavLink>
        <NavLink
          to="budget-management"
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          Budget Monitoring
        </NavLink>
        <NavLink
          to="permissions"
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          Roles and Permissions
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-700/50">
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-3 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 transform"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-3 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 transform"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
