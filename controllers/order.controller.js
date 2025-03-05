const db = require("../config/db");

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { total_price } = req.body;

        // Insert order
        const [order] = await db.execute(
            "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
            [userId, total_price]
        );

        res.json({ message: "Order placed successfully", orderId: order.insertId });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [orders] = await db.execute("SELECT * FROM orders WHERE user_id = ?", [userId]);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get order details
exports.getOrderById = async (req, res) => {
    try {
        const { order_id } = req.params;
        const [order] = await db.execute("SELECT * FROM orders WHERE id = ?", [order_id]);

        if (order.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { order_id, status } = req.body;
        await db.execute("UPDATE orders SET status = ? WHERE id = ?", [status, order_id]);

        res.json({ message: "Order status updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
