const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
//const { authenticateUser, isAdmin } = require("../middlewares/auth.middleware");

router.post("/create",  productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id",  productController.deleteProduct);

module.exports = router;
