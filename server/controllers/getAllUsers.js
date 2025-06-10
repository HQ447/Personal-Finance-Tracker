import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.json({ message: "users cant found" });

    res.json({ message: "users fetch successfully", users });
  } catch (error) {
    res.json({ message: "error in finding users", error });
    console.log("error in finding users", error);
  }
};
