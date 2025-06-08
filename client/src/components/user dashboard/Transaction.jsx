import React from "react";

import { useEffect, useState } from "react";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

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

    await fetch("http://localhost:9000/app/addTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(form),
    });

    setForm({ type: "expense", category: "", amount: "", date: "", note: "" });
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="p-2 border rounded"
        >
          <option>Select Transaction Type</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Add
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      {transactions && (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="border p-3 rounded bg-white flex justify-between items-center"
            >
              <div>
                <strong
                  className={
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }
                >
                  {tx.type.toUpperCase()}
                </strong>{" "}
                - {tx.category} - {tx.note}
                <div className="text-xs text-gray-500">
                  {new Date(tx.date).toLocaleDateString()}
                </div>
              </div>
              <div className="font-semibold">Rs {tx.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transaction;
