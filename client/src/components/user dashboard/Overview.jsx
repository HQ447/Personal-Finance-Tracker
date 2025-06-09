import { useEffect, useState } from "react";
import jsPDF from "jspdf";
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
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a29bfe",
  "#ff6b6b",
];

function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const [month] = useState(() => new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("userToken");

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
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <button
        onClick={exportToPDF}
        className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
      >
        Export PDF
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-xl font-bold text-green-700">Rs {income}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-xl font-bold text-red-700">Rs {expenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-xl font-bold text-blue-700">Rs {balance}</p>
        </div>
      </div>

      {/* Total Budget Progress */}
      {budget && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Monthly Budget Progress
          </h2>
          <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
            <div
              className={`h-4 ${
                expenses / budget.totalBudget > 1
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(
                  (expenses / budget.totalBudget) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Rs {expenses} / {budget.totalBudget}
          </p>
        </div>
      )}

      {/* Category-wise Budget Progress */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Category-wise Spending</h2>
        {budget &&
          Object.entries(budget.categoryBudgets || {}).map(
            ([category, limit]) => (
              <div key={category} className="mb-4">
                <p className="text-sm font-medium">
                  {category} — Rs {categorySpending[category] || 0} / {limit}
                </p>
                <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                  <div
                    className={`h-3 ${
                      (categorySpending[category] || 0) / limit > 1
                        ? "bg-red-500"
                        : "bg-blue-500"
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

      {/* Recent Transactions */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200 bg-white shadow rounded">
          {transactions.slice(0, 5).map((t) => (
            <li key={t._id} className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`font-semibold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}Rs {t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10b981" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">
            Category-wise Expense Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {budget?.categoryBudgets && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Expenses vs Budget</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.keys(budget.categoryBudgets).map((cat) => ({
                  category: cat,
                  Budget: Number(budget.categoryBudgets[cat]),
                  Spent: categorySpending[cat] || 0,
                }))}
              >
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Budget" fill="#8884d8" />
                <Bar dataKey="Spent" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
