const db = require("../config/db");

// Helper function for error handling
const handleError = (res, error, message = "Server error") => {
    console.error(message, error);
    res.status(500).json({ message });
};

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description = "" } = req.body;

        if (!name.trim()) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Check if category exists
        const [categoryExists] = await db.execute(
            "SELECT 1 FROM mastercategory WHERE name = ? LIMIT 1",
            [name]
        );
        if (categoryExists.length > 0) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Insert new category
        const [result] = await db.execute(
            "INSERT INTO mastercategory (name, description) VALUES (?, ?)",
            [name, description]
        );

        res.status(201).json({ message: "Category created successfully", category_id: result.insertId });
    } catch (error) {
        handleError(res, error, "Error creating category");
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute("SELECT * FROM mastercategory");
        res.json(categories);
    } catch (error) {
        handleError(res, error, "Error fetching categories");
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const [category] = await db.execute(
            "SELECT * FROM mastercategory WHERE id = ?",
            [id]
        );

        if (category.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category[0]);
    } catch (error) {
        handleError(res, error, "Error fetching category");
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description = "" } = req.body;

        if (!name.trim()) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const [result] = await db.execute(
            "UPDATE mastercategory SET name = ?, description = ? WHERE id = ?",
            [name, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found or unchanged" });
        }

        res.json({ message: "Category updated successfully" });
    } catch (error) {
        handleError(res, error, "Error updating category");
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM mastercategory WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        handleError(res, error, "Error deleting category");
    }
};
