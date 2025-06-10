import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";

function Permissions() {
  const [users, setusers] = useState([]);
  const [role, setRole] = useState("");

  const domain = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${domain}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setusers(data.users);
      }
    } catch (error) {
      console.log("error in fetching users", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${domain}/updateRole/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log("error in updating role", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 lg:p-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Permissions
      </h2>
      {users.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No Users Found</div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="relative bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium text-white ${
                  user.role === "admin" ? "bg-amber-500" : "bg-green-500"
                }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-gray-500">ID: {user._id}</p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Permissions;
