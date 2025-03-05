const db = require("../config/db");

// Create a new user
exports.createUser = (userData) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  return db.execute(sql, [userData.name, userData.email, userData.password]);
};

// Get user by email
exports.getUserByEmail = (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  return db.execute(sql, [email]);
};

// Get user by ID
exports.getUserById = (id) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  return db.execute(sql, [id]);
};

// Update user details
exports.updateUser = (id, name, email, password) => {
  const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  return db.execute(sql, [name, email, password, id]);
};

// Delete user
exports.deleteUser = (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  return db.execute(sql, [id]);
};
