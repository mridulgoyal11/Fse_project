const db = require("../config/db");

// Add a new review
exports.addReview = (userId, productId, rating, comment) => {
  const sql = `
    INSERT INTO reviews (user_id, product_id, rating, comment)
    VALUES (?, ?, ?, ?)`;
  return db.execute(sql, [userId, productId, rating, comment]);
};

// Get all reviews for a product
exports.getReviewsByProduct = (productId) => {
  const sql = `SELECT * FROM reviews WHERE product_id = ?`;
  return db.execute(sql, [productId]);
};

// Update a review
exports.updateReview = (reviewId, rating, comment) => {
  const sql = `
    UPDATE reviews 
    SET rating = ?, comment = ?
    WHERE id = ?`;
  return db.execute(sql, [rating, comment, reviewId]);
};

// Delete a review
exports.deleteReview = (reviewId) => {
  const sql = `DELETE FROM reviews WHERE id = ?`;
  return db.execute(sql, [reviewId]);
};
