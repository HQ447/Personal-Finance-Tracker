import { useEffect, useState } from "react";

function Budget() {
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  );
  const [totalBudget, setTotalBudget] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const token = localStorage.getItem("token");

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
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>💰</span> Budget Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Set and track your monthly spending limits
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Budget Form */}
        <div className="space-y-6">
          {/* Monthly Budget Setup */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📅</span> Monthly Budget Setup
            </h2>

            <div className="space-y-4">
              {/* Month Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Total Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Monthly Budget (Rs)
                </label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  placeholder="Enter total budget amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Category Budgets */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🏷️</span> Category Budgets
                </h3>
                {categories.length === 0 ? (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-400 text-2xl mb-2">📦</div>
                    <p className="text-sm text-gray-500">No categories yet</p>
                    <p className="text-xs text-gray-400">
                      Add categories below to set budgets
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div
                        key={cat._id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <label className="flex-1 font-medium text-gray-700">
                          {cat.categoryName}
                        </label>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={categoryBudgets[cat.categoryName] || ""}
                            onChange={(e) =>
                              handleCategoryChange(
                                cat.categoryName,
                                e.target.value
                              )
                            }
                            placeholder="Budget limit"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                💾 Save Budget
              </button>
            </div>
          </div>
        </div>

        {/* Add Category Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>➕</span> Add New Category
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Food, Transportation, Entertainment"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <button
                onClick={handleAddCategory}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* Existing Categories */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Existing Categories
            </h2>

            {categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">
                      {cat.categoryName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Budget: Rs{" "}
                        {categoryBudgets[cat.categoryName]
                          ? Number(
                              categoryBudgets[cat.categoryName]
                            ).toLocaleString()
                          : "0"}
                      </span>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          categoryBudgets[cat.categoryName]
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-gray-400 text-3xl mb-2">🏷️</div>
                <p className="text-gray-500">No categories created yet</p>
                <p className="text-sm text-gray-400">
                  Create your first category above
                </p>
              </div>
            )}
          </div>

          {/* Budget Summary */}
          {totalBudget && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm p-5 border border-blue-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span>📊</span> Budget Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Monthly Budget:</span>
                  <span className="font-bold text-blue-700 text-lg">
                    Rs {Number(totalBudget).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Allocated to Categories:
                  </span>
                  <span className="font-semibold text-gray-700">
                    Rs{" "}
                    {Object.values(categoryBudgets)
                      .reduce((sum, val) => sum + Number(val || 0), 0)
                      .toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-gray-600">Remaining Budget:</span>
                  <span
                    className={`font-bold ${
                      totalBudget -
                        Object.values(categoryBudgets).reduce(
                          (sum, val) => sum + Number(val || 0),
                          0
                        ) >=
                      0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Rs{" "}
                    {(
                      totalBudget -
                      Object.values(categoryBudgets).reduce(
                        (sum, val) => sum + Number(val || 0),
                        0
                      )
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Budget;
