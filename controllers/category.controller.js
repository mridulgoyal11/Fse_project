const db = require("../config/db");

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description = "" } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        // Check if category already exists
        const [categoryExists] = await db.execute("SELECT * FROM mastercategory WHERE name = ?", [name]);
        if (categoryExists.length > 0) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Insert new category
        await db.execute("INSERT INTO mastercategory (name, description) VALUES (?, ?)", [name, description]);
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute("SELECT * FROM mastercategory");
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const [category] = await db.execute("SELECT * FROM mastercategory WHERE id = ?", [id]);

        if (category.length === 0) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category[0]);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        await db.execute("UPDATE mastercategory SET name = ?, description = ? WHERE id = ?", [name, description, id]);

        res.json({ message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute("DELETE FROM mastercategory WHERE id = ?", [id]);

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Server error" });
    }
};
