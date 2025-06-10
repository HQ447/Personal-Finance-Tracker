// controllers/analyticsOverview.js
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getAnalyticsOverview = async (req, res) => {
  try {
    const [totalUsers, newUsers, transactions, topCategories] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        }),
        Transaction.aggregate([
          {
            $group: {
              _id: "$type",
              total: { $sum: "$amount" },
            },
          },
        ]),
        Transaction.aggregate([
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 5 },
        ]),
      ]);

    const income = transactions.find((t) => t._id === "income")?.total || 0;
    const expense = transactions.find((t) => t._id === "expense")?.total || 0;

    const activeUsers = await Transaction.distinct("user", {
      date: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    res.status(200).json({
      totalUsers,
      newUsers,
      activeUsers: activeUsers.length,
      totalIncome: income,
      totalExpense: expense,
      topCategories: topCategories.map((cat) => ({
        name: cat._id,
        amount: cat.total,
      })),
    });
  } catch (err) {
    console.error("❌ Analytics Overview Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
