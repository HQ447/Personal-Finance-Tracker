import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.json({ message: "user not found" });

    res.json({ message: "User fetch successfully", user });
  } catch (error) {
    res.json({ message: "error in finding user", error });
    console.log("Error in user fetching");
  }
};
