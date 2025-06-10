import User from "../models/User.js";

export const setRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) return res.json({ message: "User not found" });

    user.role = role;

    await user.save();

    res.json({ message: "User role updated" });
  } catch (error) {
    res.json({ message: "error in assigning role to user", error });
    console.log("error in assigning role", error);
  }
};
