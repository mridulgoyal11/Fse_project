const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");
//const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/add", addressController.addAddress);
router.get("/", addressController.getAddresses);
router.delete("/:address_id",  addressController.deleteAddress);

module.exports = router;
