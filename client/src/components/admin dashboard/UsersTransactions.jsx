import React, { useEffect, useState } from "react";

function UsersTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const domain = "http://localhost:9000/app";
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${domain}/getAllTransactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error("❌ Failed to fetch transactions:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      const res = await fetch(`${domain}/deleteTransaction/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchTransactions();
    } catch (err) {
      console.error("❌ Failed to delete transaction:", err);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const term = searchTerm.toLowerCase();
    return (
      tx._id.toLowerCase().includes(term) ||
      tx.user?.toLowerCase().includes(term) ||
      tx.category?.toLowerCase().includes(term) ||
      tx.amount?.toString().includes(term)
    );
  });

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">📊 Admin Transaction Oversight</h1>

      {/* Single Search Input */}
      <input
        className="p-2 border w-full md:w-1/2 mb-6"
        placeholder="Search by Transaction ID, User ID, Category or Amount"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Transaction List */}
      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <div
            key={tx._id}
            className="flex justify-between items-center border p-4 bg-white shadow-sm rounded"
          >
            <div>
              <p className="text-xs text-gray-600">User ID : {tx.user}</p>
              <p className="font-semibold">{tx.category}</p>
              <p className="text-sm text-gray-600">
                {tx.date?.slice(0, 10)} | {tx.type}
              </p>
              <p className="text-blue-600 font-bold">${tx.amount}</p>
              {tx.amount > 10000 && (
                <span className="text-red-600 font-semibold text-xs">
                  ⚠ Suspicious
                </span>
              )}
            </div>
            <button
              onClick={() => handleDelete(tx._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        {filteredTransactions.length === 0 && <p>No transactions found.</p>}
      </div>
    </div>
  );
}

export default UsersTransactions;
