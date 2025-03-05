const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
//const { authenticateUser, isAdmin } = require("../middlewares/auth.middleware");

router.post("/place",  orderController.placeOrder);
router.get("/my-orders",  orderController.getUserOrders);
router.get("/:order_id",  orderController.getOrderById);
router.put("/update-status",  orderController.updateOrderStatus);

module.exports = router;
