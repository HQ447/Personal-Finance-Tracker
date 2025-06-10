import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, email, currPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // Handle profile image upload
    if (req.file) {
      // Set new image path
      user.img = req.file.path;
    }

    // Update basic info
    if (name) user.name = name;
    if (email && email !== user.email) {
      // Check if email already exists
      const existingUser = await User.findOne({
        email,
        _id: { $ne: id },
      });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      user.email = email;
    }

    if (currPassword && newPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(
        currPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters long",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedNewPassword;
    }

    await user.save();

    // Return updated user data (without sensitive info)
    res.status(200).json({
      success: true,
      message: " Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
