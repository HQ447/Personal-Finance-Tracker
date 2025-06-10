import Transaction from "../models/Transaction.js";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    if (!transactions)
      return res.json({ message: "Error in finding transaction" });

    res.json({ transactions });
  } catch (error) {
    res.json({ message: "Error in fetching transactions" });
    console.log("error in fetching transactions", error);
  }
};
