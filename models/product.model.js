const db = require("../config/db");

// Create a new product
exports.createProduct = (name, description, price, stock, categoryId) => {
  const sql = `INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)`;
  return db.execute(sql, [name, description, price, stock, categoryId]);
};

// Get all products
exports.getAllProducts = () => {
  const sql = `SELECT products.*, master_categories.name AS category_name 
               FROM products 
               LEFT JOIN master_categories ON products.category_id = master_categories.id`;
  return db.execute(sql);
};

// Get product by ID
exports.getProductById = (id) => {
  const sql = `SELECT products.*, master_categories.name AS category_name 
               FROM products 
               LEFT JOIN master_categories ON products.category_id = master_categories.id
               WHERE products.id = ?`;
  return db.execute(sql, [id]);
};

// Update product details
exports.updateProduct = (id, name, description, price, stock, categoryId) => {
  const sql = `UPDATE products 
               SET name = ?, description = ?, price = ?, stock = ?, category_id = ? 
               WHERE id = ?`;
  return db.execute(sql, [name, description, price, stock, categoryId, id]);
};

// Delete product
exports.deleteProduct = (id) => {
  const sql = `DELETE FROM products WHERE id = ?`;
  return db.execute(sql, [id]);
};
