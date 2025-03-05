const db = require("../config/db");

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from JWT
        const { product_id, quantity } = req.body;

        // Check if product exists
        const [product] = await db.execute("SELECT * FROM products WHERE id = ?", [product_id]);
        if (product.length === 0) {
            return res.status(400).json({ message: "Product not found" });
        }

        // Insert or update cart
        await db.execute(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
            [userId, product_id, quantity, quantity]
        );

        res.json({ message: "Product added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//hello
// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [cart] = await db.execute(
            "SELECT cart.id, products.name, products.price, cart.quantity FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?",
            [userId]
        );

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update cart item quantity
exports.updateCart = async (req, res) => {
    try {
        const { cart_id, quantity } = req.body;
        await db.execute("UPDATE cart SET quantity = ? WHERE id = ?", [quantity, cart_id]);

        res.json({ message: "Cart updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { cart_id } = req.params;
        await db.execute("DELETE FROM cart WHERE id = ?", [cart_id]);

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
