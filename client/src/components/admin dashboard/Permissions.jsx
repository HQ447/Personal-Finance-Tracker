import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
function Permissions() {
  const [users, setusers] = useState([]);
  const [role, setRole] = useState("user");

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
  }, []);

  return (
    <div className="p-16">
      {users.length == 0 ? (
        <div>Users Not Found</div>
      ) : (
        <div className="flex flex-col gap-4  ">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex relative justify-between items-center bg-gray-100 rounded-sm p-6 "
            >
              <p
                className={` ${
                  user.role == "admin" ? "bg-amber-500" : "bg-green-500"
                } px-3 text-xs absolute top-1 left-1  rounded-full text-white font-semibold `}
              >
                {user.role}
              </p>
              <div className="flex flex-col ">
                <p className="text-sm text-gray-600">ID:{user._id}</p>
                <h1 className="text-lg font-bold">{user.name}</h1>
              </div>

              <select
                name="role"
                id=""
                onChange={(e) => setRole(e.target.value)}
              >
                <option>select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => handleUpdate(user._id)}
                className=" cursor-pointer hover:scale-95 transition-all px-3 bg-blue-500 text-white rounded-sm py-1"
              >
                Update Role
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Permissions;
