const express = require("express");
const avmController = require("../controllers/avmController");

const router = express.Router();

// Route for fetching AVM data
router.post("/", avmController.getAVM);

module.exports = router;
