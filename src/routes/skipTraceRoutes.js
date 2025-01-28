const express = require("express");
const skipTraceController = require("../controllers/skipTraceController");

const router = express.Router();

// Route for processing skip trace
router.post("/", skipTraceController.processSkipTrace);

module.exports = router;
