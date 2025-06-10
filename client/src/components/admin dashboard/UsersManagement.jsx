/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";

function UsersManagement() {
  const [users, setusers] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${domain}/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log("error in deleting user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 lg:p-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
      {users.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No Users Found</div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500">ID: {user._id}</p>
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    user.role === "admin" ? "bg-amber-500" : "bg-green-500"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-600 text-2xl transition-transform duration-200 hover:scale-110 focus:outline-none"
                  aria-label={`Delete user ${user.name}`}
                >
                  <IoTrashBin />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
