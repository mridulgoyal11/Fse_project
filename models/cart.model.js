const db = require("../config/db");

// Add product to cart
exports.addToCart = (userId, productId, quantity = 1) => {
  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?`;
  return db.execute(sql, [userId, productId, quantity, quantity]);
};

// Get cart items for a user
exports.getCartByUser = (userId) => {
  const sql = `
    SELECT cart.id, cart.quantity, products.name, products.price
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?`;
  return db.execute(sql, [userId]);
};

// Update cart item quantity
exports.updateCartQuantity = (cartId, quantity) => {
  const sql = `UPDATE cart SET quantity = ? WHERE id = ?`;
  return db.execute(sql, [quantity, cartId]);
};

// Remove item from cart
exports.removeFromCart = (cartId) => {
  const sql = `DELETE FROM cart WHERE id = ?`;
  return db.execute(sql, [cartId]);
};

// Clear entire cart for a user
exports.clearCart = (userId) => {
  const sql = `DELETE FROM cart WHERE user_id = ?`;
  return db.execute(sql, [userId]);
};
