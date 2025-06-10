import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/authUtils";
import AdminSidebar from "../components/admin dashboard/AdminSidebar";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");

      let expired = false;

      if (token && isTokenExpired(token)) {
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
      <AdminSidebar />
      <div className="w-[78%] max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
