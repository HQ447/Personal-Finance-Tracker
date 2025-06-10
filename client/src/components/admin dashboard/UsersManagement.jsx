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
    <div className="p-16">
      {users.length == 0 ? (
        <div>Users Not Found</div>
      ) : (
        <div className="flex flex-col gap-4  ">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-gray-100 rounded-sm p-6 "
            >
              <div className="flex flex-col ">
                <p className="text-sm text-gray-600">ID:{user._id}</p>
                <h1 className="text-lg font-bold">{user.name}</h1>
              </div>

              <p className="px-3  rounded-full text-white font-semibold bg-green-500">
                {user.role}
              </p>
              <IoTrashBin
                onClick={() => handleDelete(user._id)}
                className="text-2xl cursor-pointer text-red-600 hover:scale-110 transition-all"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersManagement;
