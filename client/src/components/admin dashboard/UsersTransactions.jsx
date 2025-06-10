import React, { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  AlertTriangle,
  DollarSign,
  Calendar,
  Tag,
  User,
} from "lucide-react";

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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Admin Transaction Oversight
              </h1>
              <p className="text-gray-500 mt-1">
                Monitor and manage all user transactions
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by ID, user, category, or amount..."
              className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Transactions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTransactions.map((tx) => (
            <div
              key={tx._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Transaction Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    RS {tx.amount}
                  </span>
                </div>
                {tx.amount > 10000 && (
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Suspicious</span>
                  </div>
                )}
              </div>

              {/* Transaction Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">
                    <span className="font-medium text-gray-800">User ID:</span>{" "}
                    {tx.user}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">
                    <span className="font-medium text-gray-800">Category:</span>{" "}
                    {tx.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {tx.date?.slice(0, 10)}
                  </span>
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tx.type}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDelete(tx._id)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
                Delete Transaction
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersTransactions;
