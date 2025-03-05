const db = require("../config/db");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;

        // Validate input
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if category exists
        const [category] = await db.execute("SELECT id FROM mastercategory WHERE id = ?", [category_id]);
        if (category.length === 0) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        // Insert product
        await db.execute(
            "INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)", 
            [name, description || null, price, stock, category_id]
        );

        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const [products] = await db.execute("SELECT * FROM products");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [product] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product[0]);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body;

        // Validate input
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const [result] = await db.execute(
            "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?", 
            [name, description || null, price, stock, category_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }

        res.json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
};
