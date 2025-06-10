import Budget from "../models/Budget.js";

export const getAllUserBudget = async (req, res) => {
  try {
    const budgets = await Budget.find();

    if (!budgets) return res.json({ message: "Error in finding budgets" });

    res.json({ budgets });
  } catch (error) {
    res.json({ message: "Error in fetching budgets" });
    console.log("error in fetching budgets", error);
  }
};
