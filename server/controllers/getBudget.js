import Budget from "../models/Budget.js";
export const getBudget = async (req, res) => {
  try {
    const { month } = req.query;

    const budget = await Budget.findOne({ user: req.user.id, month });

    res.json(budget || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to get budget" });
  }
};
