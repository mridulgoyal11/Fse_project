const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
//const { authenticateUser, isAdmin } = require("../middlewares/auth.middleware");

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id",  categoryController.updateCategory);
router.delete("/:id",  categoryController.deleteCategory);

module.exports = router;
