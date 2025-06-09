import mongoose from "mongoose";
import { sendBudgetExceededEmail } from "../utils/sendEmail.js";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import User from "../models/User.js";

export const addTransaction = async (req, res) => {
  const { category, amount, type, date, note } = req.body;

  const userId = req.user.id;

  try {
    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      date,
      note,
    });

    if (type === "expense") {
      const currentMonth = new Date(date).toISOString().slice(0, 7); // Format: YYYY-MM

      const budget = await Budget.findOne({
        user: userId,
        month: currentMonth,
      });

      if (budget && budget.categoryBudgets.has(category)) {
        const budgetLimit = budget.categoryBudgets.get(category);

        const totalSpent = await Transaction.aggregate([
          {
            $match: {
              user: new mongoose.Types.ObjectId(userId),
              category,
              type: "expense",
              date: {
                $gte: new Date(`${currentMonth}-01`),
                $lt: new Date(`${currentMonth}-31`),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]);

        const spent = totalSpent[0]?.total || 0;

        if (spent > budgetLimit) {
          const user = await User.findById(userId);

          console.log(
            `🚨 Budget exceeded for ${category}: Spent ${spent}, Limit ${budgetLimit}`
          );

          await sendBudgetExceededEmail({
            to: user.email,
            category,
            spent,
            budget: budgetLimit,
          });
        }
      }
    }

    res.status(201).json(transaction);
  } catch (err) {
    console.error("❌ Error adding transaction:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
