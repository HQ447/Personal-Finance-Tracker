import React, { useEffect, useState } from "react";

function Analytics() {
  const [data, setData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalIncome: 0,
    totalExpense: 0,
    topCategories: [],
  });

  const token = localStorage.getItem("token");
  const domain = "http://localhost:9000/app";

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${domain}/admin/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (res.ok) setData(result);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">📈 Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card title="🧍 Total Users" value={data.totalUsers} />
        <Card title="✅ Active This Month" value={data.activeUsers} />
        <Card title="🆕 New Users" value={data.newUsers} />
        <Card title="💰 Total Income" value={`RS ${data.totalIncome}`} />
        <Card title="💸 Total Expense" value={`RS ${data.totalExpense}`} />
      </div>

      {/* Top Categories */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-4">
          📊 Top Spending Categories
        </h2>
        {data.topCategories.length > 0 ? (
          <ul className="space-y-2">
            {data.topCategories.map((cat, i) => (
              <li key={i} className="flex justify-between">
                <span>{cat.name}</span>
                <span className="font-bold">RS {cat.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Analytics;
