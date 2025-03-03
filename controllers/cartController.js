const db = require('../config/db');

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        await db.query(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`, [user_id, product_id, quantity]);
        res.status(201).json({ success: true, message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get cart items
const getCartItems = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id, 10);
        const { rows } = await db.query(`SELECT * FROM cart WHERE user_id = ?`, [user_id]);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update cart item
const updateCartItem = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        await db.query(`UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?`, [quantity, user_id, product_id]);
        res.status(200).json({ success: true, message: 'Cart item updated' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;
        await db.query(`DELETE FROM cart WHERE user_id = ? AND product_id = ?`, [user_id, product_id]);
        res.status(200).json({ success: true, message: 'Cart item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { addToCart, getCartItems, updateCartItem, deleteCartItem };
