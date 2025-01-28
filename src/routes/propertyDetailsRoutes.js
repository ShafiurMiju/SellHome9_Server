const express = require("express");
const propertyDetailsController = require("../controllers/propertyDetailsController");

const router = express.Router();

// Route for fetching property details
router.post("/", propertyDetailsController.getPropertyDetails);

module.exports = router;
