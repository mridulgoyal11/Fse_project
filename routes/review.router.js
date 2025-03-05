const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
//const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/add",  reviewController.addReview);
router.get("/:product_id", reviewController.getReviews);
router.put("/update",  reviewController.updateReview);
router.delete("/:review_id",  reviewController.deleteReview);

module.exports = router;
