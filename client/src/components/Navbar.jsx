import { useEffect } from "react";
import { isTokenExpired } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const userToken = localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName");
  const adminName = localStorage.getItem("adminName");
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear(); // remove all auth data

    navigate("/");
  }

  useEffect(() => {
    const checkTokenExpiry = () => {
      const userToken = localStorage.getItem("userToken");
      const adminToken = localStorage.getItem("adminToken");

      let expired = false;

      if (userToken && isTokenExpired(userToken)) {
        // Clear user data only
        // localStorage.removeItem("studentToken");
        // localStorage.removeItem("studentId");
        // localStorage.removeItem("studentName");
        handleLogout();
        expired = true;
        //setImgPreview(null);
      }

      if (adminToken && isTokenExpired(adminToken)) {
        // Clear admin data only
        // localStorage.removeItem("adminToken");
        // localStorage.removeItem("adminId");
        // localStorage.removeItem("adminName");

        handleLogout();
        expired = true;
      }

      if (expired) {
        // localStorage.getItem("studentId"),
        //   localStorage.getItem("studentName"),
        //   localStorage.getItem("adminId"),
        //   localStorage.getItem("adminName"),
        //   localStorage.getItem("teacherId"),
        //   localStorage.getItem("teacherName"),
        handleLogout();
        // Redirect user to product or login page as you prefer
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex justify-between w-full py-5 px-20 bg-black text-white">
      <h1>Finance Tracker</h1>

      <div className="flex justify-center items-center gap-3">
        {userToken ? (
          <h1>{userName}</h1>
        ) : adminToken ? (
          <h1>{adminName}</h1>
        ) : (
          <h1>Guest</h1>
        )}
        {userToken ? (
          <h1
            className="cursor-pointer "
            onClick={() => navigate("/user-dashboard")}
          >
            UserDashboard
          </h1>
        ) : adminToken ? (
          <h1>adminDashboard</h1>
        ) : null}
        {userToken || adminToken ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black px-3 py-2 rounded-md"
          >
            logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-black px-3 py-2 rounded-md"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
