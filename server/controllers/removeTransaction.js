import Transaction from "../models/Transaction.js";

export const removeTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) return res.json({ message: "transacction not found" });

    await Transaction.findByIdAndDelete(id);

    res.json({ message: "Transaction Removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error in removing transactions");
  }
};
