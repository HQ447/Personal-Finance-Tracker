import React, { useEffect, useState } from "react";

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
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">📊 Admin Budget Monitoring</h1>

      {loading ? (
        <p>Loading budgets...</p>
      ) : budgets.length === 0 ? (
        <p>No user budgets found.</p>
      ) : (
        <div className="space-y-6">
          {budgets.map((item) => (
            <div
              key={item._id}
              className="border p-4 bg-white rounded shadow-sm"
            >
              <p className="text-sm text-gray-600">
                🧑 User ID: {item.user?._id || item.user}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                📅 Month: {item.month}
              </p>
              <p className="text-sm mb-2">
                🎯 Total Budget:{" "}
                <span className="font-semibold">RS {item.totalBudget}</span>
              </p>

              <div className="bg-gray-100 p-3 rounded mb-2">
                <h4 className="font-semibold mb-1">📂 Category Budgets:</h4>
                {item.categoryBudgets &&
                  Object.entries(item.categoryBudgets).map(
                    ([category, amount], idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm bg-white p-2 my-1 rounded shadow"
                      >
                        <span>{category}</span>
                        <span>${amount}</span>
                      </div>
                    )
                  )}
              </div>

              <button
                onClick={() => sendBudgetAlert(item.user?._id || item.user)}
                className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                🚨 Send Budget Alert
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersBudgets;
