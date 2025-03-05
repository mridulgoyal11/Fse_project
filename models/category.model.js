const db = require("../config/db");

// Create a new master category
exports.createMasterCategory = (name) => {
  const sql = "INSERT INTO master_categories (name) VALUES (?)";
  return db.execute(sql, [name]);
};

// Get all master categories
exports.getAllMasterCategories = () => {
  const sql = "SELECT * FROM master_categories";
  return db.execute(sql);
};

// Get master category by ID
exports.getMasterCategoryById = (id) => {
  const sql = "SELECT * FROM master_categories WHERE id = ?";
  return db.execute(sql, [id]);
};

// Update master category name
exports.updateMasterCategory = (id, name) => {
  const sql = "UPDATE master_categories SET name = ? WHERE id = ?";
  return db.execute(sql, [name, id]);
};

// Delete master category
exports.deleteMasterCategory = (id) => {
  const sql = "DELETE FROM master_categories WHERE id = ?";
  return db.execute(sql, [id]);
};
