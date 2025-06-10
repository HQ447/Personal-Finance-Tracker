import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { IoTrashBinSharp } from "react-icons/io5";

import autoTable from "jspdf-autotable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Bar,
  BarChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#667eea",
  "#764ba2",
  "#f093fb",
  "#f5576c",
  "#4facfe",
  "#43e97b",
  "#fa709a",
  "#fee140",
];

function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [month] = useState(() => new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const txRes = await fetch(`http://localhost:9000/app/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const txData = await txRes.json();
    setTransactions(txData);

    const budgetRes = await fetch(
      `http://localhost:9000/app/budgets?month=${month}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const budgetData = await budgetRes.json();
    setBudget(budgetData);
  };

  const handleTransactionDeletion = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:9000/app/deleteTransaction/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = income - expenses;

  const categorySpending = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categorySpending[t.category] =
        (categorySpending[t.category] || 0) + Number(t.amount);
    }
  });

  // Line chart data (grouped by date)
  const chartData = [];
  const grouped = {};

  transactions.forEach((t) => {
    const day = new Date(t.date).toLocaleDateString();
    if (!grouped[day]) {
      grouped[day] = { date: day, income: 0, expense: 0 };
    }
    grouped[day][t.type] += Number(t.amount);
  });

  for (const day in grouped) {
    chartData.push(grouped[day]);
  }

  // Pie chart data
  const pieData = Object.entries(categorySpending).map(([category, value]) => ({
    name: category,
    value,
  }));

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 16);

    const tableColumn = ["Date", "Type", "Category", "Amount", "Description"];
    const tableRows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.type,
      t.category,
      t.amount,
      t.description || "-",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with glassmorphism effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0  rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Financial Dashboard
                </h1>
                <p className="text-slate-600 text-sm lg:text-base font-medium">
                  Your complete financial overview at a glance
                </p>
              </div>
              <button
                onClick={exportToPDF}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Export PDF
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Income Card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                  <div className="text-2xl">💰</div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    Total Income
                  </p>
                  <p className="text-2xl font-black text-emerald-700 mt-1">
                    Rs {income.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Expenses Card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl">
                  <div className="text-2xl">💸</div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                    Total Expenses
                  </p>
                  <p className="text-2xl font-black text-red-700 mt-1">
                    Rs {expenses.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="w-full bg-red-100 h-2 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl">
            <div
              className={`absolute inset-0 ${
                balance >= 0
                  ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                  : "bg-gradient-to-r from-orange-400 to-red-500"
              } rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            ></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 bg-gradient-to-br ${
                    balance >= 0
                      ? "from-blue-100 to-indigo-100"
                      : "from-orange-100 to-red-100"
                  } rounded-xl`}
                >
                  <div className="text-2xl">{balance >= 0 ? "📈" : "📉"}</div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-semibold ${
                      balance >= 0 ? "text-blue-600" : "text-orange-600"
                    } uppercase tracking-wider`}
                  >
                    Net Balance
                  </p>
                  <p
                    className={`text-2xl font-black mt-1 ${
                      balance >= 0 ? "text-blue-700" : "text-red-600"
                    }`}
                  >
                    Rs {balance.toLocaleString()}
                  </p>
                </div>
              </div>
              <div
                className={`w-full ${
                  balance >= 0 ? "bg-blue-100" : "bg-orange-100"
                } h-2 rounded-full overflow-hidden`}
              >
                <div
                  className={`h-2 ${
                    balance >= 0
                      ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                      : "bg-gradient-to-r from-orange-400 to-red-500"
                  } rounded-full animate-pulse`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Progress with enhanced design */}
        {budget && (
          <div className="mb-8">
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                  <span className="text-xl">🎯</span>
                </div>
                Monthly Budget Progress
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 w-full">
                  <div className="relative w-full bg-slate-200 h-6 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-6 transition-all duration-1000 ease-out relative overflow-hidden ${
                        expenses / budget.totalBudget > 1
                          ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                          : "bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600"
                      }`}
                      style={{
                        width: `${Math.min(
                          (expenses / budget.totalBudget) * 100,
                          100
                        )}%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-100 px-6 py-3 rounded-xl">
                  <div className="text-base font-bold text-slate-700">
                    Rs {expenses.toLocaleString()} / Rs{" "}
                    {budget.totalBudget?.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">
                    {((expenses / budget.totalBudget) * 100).toFixed(1)}% used
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Budget Progress with cards */}
        {budget && Object.keys(budget.categoryBudgets || {}).length > 0 && (
          <div className="mb-8">
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                  <span className="text-xl">📊</span>
                </div>
                Category Spending
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(budget.categoryBudgets || {}).map(
                  ([category, limit]) => (
                    <div
                      key={category}
                      className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-slate-700 text-base">
                          {category}
                        </span>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {(
                            ((categorySpending[category] || 0) / limit) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm text-slate-600">
                          Rs{" "}
                          {(categorySpending[category] || 0).toLocaleString()} /
                          Rs {limit?.toLocaleString()}
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-3 transition-all duration-500 ${
                            (categorySpending[category] || 0) / limit > 1
                              ? "bg-gradient-to-r from-red-400 to-red-600"
                              : "bg-gradient-to-r from-blue-400 to-purple-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              ((categorySpending[category] || 0) / limit) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid with enhanced styling */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <span className="text-xl">📈</span>
              </div>
              Income vs Expense Trend
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="url(#incomeGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="url(#expenseGradient)"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                />
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f87171" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                <span className="text-xl">🥧</span>
              </div>
              Expense Distribution
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelStyle={{
                    fontSize: "12px",
                    fontWeight: "600",
                    fill: "#475569",
                  }}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget vs Spending Bar Chart */}
        {budget?.categoryBudgets && (
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl">
                <span className="text-xl">📊</span>
              </div>
              Budget vs Actual Spending
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={Object.keys(budget.categoryBudgets).map((cat) => ({
                  category: cat,
                  Budget: Number(budget.categoryBudgets[cat]),
                  Spent: categorySpending[cat] || 0,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="Budget"
                  fill="url(#budgetGradient)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="Spent"
                  fill="url(#spentGradient)"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="budgetGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <linearGradient
                    id="spentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* Recent Transactions with enhanced cards */}
        <div className="mt-8">
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                <span className="text-xl">🔄</span>
              </div>
              Recent Transactions
            </h2>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t) => (
                <div
                  key={t._id}
                  className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:shadow-lg hover:bg-white/80 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full shadow-lg ${
                        t.type === "income"
                          ? "bg-gradient-to-r from-emerald-400 to-green-500"
                          : "bg-gradient-to-r from-red-400 to-pink-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-semibold text-slate-800 text-base group-hover:text-slate-900 transition-colors">
                        {t.category}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-base px-3 py-1 rounded-xl ${
                      t.type === "income"
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-red-700 bg-red-50"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}Rs{" "}
                    {Number(t.amount).toLocaleString()}
                  </div>
                  <IoTrashBinSharp
                    className="text-2xl text-red-700 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => handleTransactionDeletion(t._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
