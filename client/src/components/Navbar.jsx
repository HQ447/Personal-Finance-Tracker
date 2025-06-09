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
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const checkTokenExpiry = () => {
      const userToken = localStorage.getItem("userToken");
      const adminToken = localStorage.getItem("adminToken");

      let expired = false;

      if (userToken && isTokenExpired(userToken)) {
        handleLogout();
        expired = true;
      }

      if (adminToken && isTokenExpired(adminToken)) {
        handleLogout();
        expired = true;
      }

      if (expired) {
        handleLogout();
        navigate("/");
      }
    };

    const interval = setInterval(checkTokenExpiry, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <nav className="flex justify-between items-center w-full py-4 px-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700/50">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Finance Tracker
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {userToken ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <span className="text-slate-200 font-medium">{userName}</span>
            </div>
          ) : adminToken ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {adminName ? adminName.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
              <span className="text-slate-200 font-medium">{adminName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-slate-400">Guest</span>
            </div>
          )}
        </div>

        {/* Dashboard Link */}
        {userToken && (
          <button
            onClick={() => navigate("/user-dashboard")}
            className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium border border-slate-600/50 hover:border-slate-500"
          >
            Dashboard
          </button>
        )}

        {adminToken && (
          <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium border border-slate-600/50 hover:border-slate-500">
            Admin Panel
          </button>
        )}

        {/* Auth Button */}
        {userToken || adminToken ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
