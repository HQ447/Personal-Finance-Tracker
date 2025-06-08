import Budget from "../models/Budget.js";

export const setBudget = async (req, res) => {
  try {
    const { month, totalBudget, categoryBudgets } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { user: req.user.id, month },
      { totalBudget, categoryBudgets },
      { new: true, upsert: true }
    );

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Failed to set budget" });
  }
};
