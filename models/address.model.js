const db = require("../config/db");

// Add a new address
exports.addAddress = (userId, street, city, state, zip) => {
  const sql = `
    INSERT INTO addresses (user_id, street, city, state, zip)
    VALUES (?, ?, ?, ?, ?)`;
  return db.execute(sql, [userId, street, city, state, zip]);
};

// Get addresses by user ID
exports.getAddressesByUser = (userId) => {
  const sql = `SELECT * FROM addresses WHERE user_id = ?`;
  return db.execute(sql, [userId]);
};

// Update address
exports.updateAddress = (addressId, street, city, state, zip) => {
  const sql = `
    UPDATE addresses 
    SET street = ?, city = ?, state = ?, zip = ?
    WHERE id = ?`;
  return db.execute(sql, [street, city, state, zip, addressId]);
};

// Delete an address
exports.deleteAddress = (addressId) => {
  const sql = `DELETE FROM addresses WHERE id = ?`;
  return db.execute(sql, [addressId]);
};
