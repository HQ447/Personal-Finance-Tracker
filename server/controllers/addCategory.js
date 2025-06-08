import Category from "../models/Category.js";

// Add new category
export const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName)
      return res.status(400).json({ message: "Category name is required" });

    const existing = await Category.findOne({ categoryName });
    if (existing)
      return res.status(409).json({ message: "Category already exists" });

    const newCategory = new Category({ categoryName });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding category", error: err.message });
  }
};
