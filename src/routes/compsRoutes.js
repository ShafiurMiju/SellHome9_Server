const express = require("express");
const compsController = require("../controllers/compsController");

const router = express.Router();

// Route for fetching property comparables (comps)
router.post("/", compsController.getComps);

module.exports = router;
