import React, { useEffect, useState } from "react";
import {
  PieChart,
  User,
  Calendar,
  Target,
  AlertTriangle,
  DollarSign,
  Loader,
  Bell,
} from "lucide-react";

function UsersBudgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const domain = "http://localhost:9000/app";

  const fetchBudgets = async () => {
    try {
      const res = await fetch(`${domain}/getAllUsersBudget`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setBudgets(data.budgets || []);
      }
    } catch (err) {
      console.error("❌ Error fetching budgets", err);
    } finally {
      setLoading(false);
    }
  };

  const sendBudgetAlert = async (userId) => {
    try {
      const res = await fetch(`${domain}/sendBudgetAlert/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ Budget alert sent!");
      } else {
        alert("❌ Failed to send alert");
      }
    } catch (err) {
      console.error("❌ Error sending alert", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <PieChart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Admin Budget Monitoring
              </h1>
              <p className="text-gray-500 mt-1">
                Track and manage user budget allocations
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12">
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-gray-600 text-lg">Loading budgets...</p>
              </div>
            </div>
          </div>
        ) : budgets.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <PieChart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No user budgets found
              </h3>
              <p className="text-gray-500">
                Budget data will appear here once users create their budgets.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((item) => (
              <div
                key={item._id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* Budget Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Budget Overview
                      </h3>
                      <p className="text-sm text-gray-500">
                        Monthly allocation
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">
                      <span className="font-medium text-gray-800">
                        User ID:
                      </span>{" "}
                      {item.user?._id || item.user}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">
                      <span className="font-medium text-gray-800">Month:</span>{" "}
                      {item.month}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm">
                      <span className="font-medium text-gray-800">
                        Total Budget:
                      </span>
                      <span className="text-lg font-bold text-emerald-600 ml-1">
                        RS {item.totalBudget}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Category Budgets */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-indigo-500" />
                    Category Budgets
                  </h4>
                  <div className="space-y-2">
                    {item.categoryBudgets &&
                      Object.entries(item.categoryBudgets).map(
                        ([category, amount], idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {category}
                            </span>
                            <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                              ${amount}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>

                {/* Alert Button */}
                <button
                  onClick={() => sendBudgetAlert(item.user?._id || item.user)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Bell className="w-4 h-4" />
                  Send Budget Alert
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersBudgets;
