const db = require("../config/db");

// Add a review
exports.addReview = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { product_id, rating, review_text } = req.body;

        await db.execute(
            "INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?)",
            [userId, product_id, rating, review_text]
        );

        res.json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get product reviews
exports.getReviews = async (req, res) => {
    try {
        const { product_id } = req.params;
        const [reviews] = await db.execute("SELECT * FROM reviews WHERE product_id = ?", [product_id]);

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { review_id, rating, review_text } = req.body;
        await db.execute("UPDATE reviews SET rating = ?, review_text = ? WHERE id = ?", [rating, review_text, review_id]);

        res.json({ message: "Review updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { review_id } = req.params;
        await db.execute("DELETE FROM reviews WHERE id = ?", [review_id]);

        res.json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
