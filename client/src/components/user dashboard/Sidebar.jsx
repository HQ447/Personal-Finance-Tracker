import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="flex gap-4 flex-col px-5 py-10 w-[22%] bg-gray-200 max-h-screen">
      <h1 className="font-bold text-2xl">Dashboard User</h1>
      <br />
      <div className="flex flex-col gap-3">
        <NavLink to={""}>Overview</NavLink>
        <NavLink to={"transaction"}>Add Transaction</NavLink>
        <NavLink to={"budget"}>Manage Budget</NavLink>
      </div>
      <button
        className="bg-blue-600 px-3 py-1 text-white rounded-md"
        onClick={() => navigate("/")}
      >
        Home{" "}
      </button>
      <button
        className="bg-red-600 px-3 py-1 text-white rounded-md"
        onClick={handleLogout}
      >
        Logout{" "}
      </button>
    </div>
  );
}

export default Sidebar;
