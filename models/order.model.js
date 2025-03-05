const db = require("../config/db");

// Create a new order
exports.createOrder = (userId, totalAmount, status = "pending") => {
  const sql = `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)`;
  return db.execute(sql, [userId, totalAmount, status]);
};

// Get all orders
exports.getAllOrders = () => {
  const sql = `SELECT orders.*, users.name AS user_name 
               FROM orders 
               JOIN users ON orders.user_id = users.id`;
  return db.execute(sql);
};

// Get order by ID
exports.getOrderById = (id) => {
  const sql = `SELECT orders.*, users.name AS user_name 
               FROM orders 
               JOIN users ON orders.user_id = users.id 
               WHERE orders.id = ?`;
  return db.execute(sql, [id]);
};

// Update order status
exports.updateOrderStatus = (id, status) => {
  const sql = `UPDATE orders SET status = ? WHERE id = ?`;
  return db.execute(sql, [status, id]);
};

// Delete order
exports.deleteOrder = (id) => {
  const sql = `DELETE FROM orders WHERE id = ?`;
  return db.execute(sql, [id]);
};
