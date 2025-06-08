import { useEffect, useState } from "react";

function Budget() {
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [totalBudget, setTotalBudget] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const token = localStorage.getItem("userToken");

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:9000/app/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data || []);
  };

  // Fetch existing budget for the selected month
  const fetchBudget = async () => {
    const res = await fetch(
      `http://localhost:9000/app/budgets?month=${month}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (data) {
      setTotalBudget(data.totalBudget || "");
      setCategoryBudgets(data.categoryBudgets || {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:9000/app/addBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ month, totalBudget, categoryBudgets }),
    });
    if (res.ok) {
      fetchBudget();
      alert("Budget updated!");
    }
  };

  const handleCategoryChange = (category, value) => {
    setCategoryBudgets({ ...categoryBudgets, [category]: value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return alert("Enter a category name");

    const res = await fetch("http://localhost:9000/app/addCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryName: newCategory }),
    });

    if (res.ok) {
      setNewCategory("");
      fetchCategories(); // Refresh the list
      alert("Category added!");
    } else {
      alert("Failed to add category.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBudget();
  }, [month]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Set Monthly Budget</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          placeholder="Total Monthly Budget"
          className="p-2 border rounded w-full"
        />

        <h2 className="font-semibold">Category Budgets</h2>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat._id} className="flex items-center gap-2">
              <label className="w-32">{cat.categoryName}:</label>
              <input
                type="number"
                value={categoryBudgets[cat.categoryName] || ""}
                onChange={(e) =>
                  handleCategoryChange(cat.categoryName, e.target.value)
                }
                className="p-2 border rounded w-full"
              />
            </div>
          ))
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Save Budget
        </button>
      </form>

      {/* Add Category Form */}
      <div className="mt-6 border-t pt-4">
        <h2 className="font-semibold mb-2">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Budget;
