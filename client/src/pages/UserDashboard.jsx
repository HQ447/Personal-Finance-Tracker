import React, { useEffect } from "react";
import Sidebar from "../components/user dashboard/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";

function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const userToken = localStorage.getItem("userToken");
      const adminToken = localStorage.getItem("adminToken");

      let expired = false;

      if (userToken && isTokenExpired(userToken)) {
        // Clear user data only
        // localStorage.removeItem("studentToken");

        expired = true;
        //setImgPreview(null);
      }

      if (adminToken && isTokenExpired(adminToken)) {
        // Clear admin data only
        // localStorage.removeItem("adminToken");
        //
        expired = true;
      }

      if (expired) {
        localStorage.clear();
        // Redirect user to product or login page as you prefer
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="w-[78%] max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;
