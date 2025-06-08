import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, // Format: '2025-06'
    totalBudget: { type: Number, required: true },
    categoryBudgets: {
      type: Map,
      of: Number, // e.g., { Food: 10000, Rent: 20000 }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
