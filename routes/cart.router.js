const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
//const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/add", cartController.addToCart);
router.get("/",  cartController.getCart);
router.put("/update",  cartController.updateCart);
router.delete("/:cart_id",  cartController.removeFromCart);

module.exports = router;
