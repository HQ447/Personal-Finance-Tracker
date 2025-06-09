import React from "react";
import { useEffect, useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:9000/app/categories", {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    const data = await res.json();
    setCategories(data || []);
  };
  const handleTransactionDeletion = async (id) => {
    try {
      const token = localStorage.getItem("userToken");

      await fetch(`http://localhost:9000/app/deleteTransaction/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:9000/app/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    const data = await res.json();
    setTransactions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:9000/app/addTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(form),
      });

      setForm({
        type: "expense",
        category: "",
        amount: "",
        date: "",
        note: "",
      });
      fetchTransactions();
    } catch (error) {
      console.log("Error :::", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>💳</span> Add Transaction
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Record your income and expenses
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Transaction Form */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📝</span> New Transaction
          </h2>

          <div className="space-y-4">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "expense" })}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    form.type === "expense"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>💸</span>
                    <span className="font-medium">Expense</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "income" })}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    form.type === "income"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>💰</span>
                    <span className="font-medium">Income</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">Select a Category</option>
                {form.type === "income" ? (
                  <>
                    <option value="Salary">💼 Salary</option>
                    <option value="Bonus">🎁 Bonus</option>
                    <option value="Other">📦 Other</option>
                  </>
                ) : (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.categoryName}>
                      {cat.categoryName}
                    </option>
                  ))
                )}
              </select>
              {form.type !== "income" && categories.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No categories yet. Create one in the Budget section.
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (Rs)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <input
                type="text"
                name="note"
                placeholder="Add a note..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add Transaction
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> Recent Transactions
          </h2>

          {transactions && transactions.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {transactions.slice(0, 10).map((tx) => (
                <div
                  key={tx._id}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between gap-3 items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            tx.type === "income"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tx.type === "income" ? "💰" : "💸"}{" "}
                          {tx.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800">{tx.category}</p>
                      {tx.note && (
                        <p className="text-sm text-gray-600 mt-1">{tx.note}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-bold text-lg ${
                          tx.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}Rs{" "}
                        {Number(tx.amount).toLocaleString()}
                      </div>
                    </div>
                    <IoTrashBinSharp
                      className="text-2xl text-red-700  cursor-pointer hover:scale-105 transition-all"
                      onClick={() => handleTransactionDeletion(tx._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">📊</div>
              <p className="text-gray-500">No transactions yet</p>
              <p className="text-sm text-gray-400">
                Add your first transaction to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
