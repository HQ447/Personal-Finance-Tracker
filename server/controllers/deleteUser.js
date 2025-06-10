import User from "../models/User.js";

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return res.json({ message: "User not found" });

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.json({ message: "Error in deleting user", error });
    console.log("error in deleting user:::", error);
  }
};
