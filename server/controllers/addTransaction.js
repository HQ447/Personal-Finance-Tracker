import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, note } = req.body;
    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      date,
      note,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
};
