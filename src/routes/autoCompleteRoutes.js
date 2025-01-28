const express = require("express");
const autoCompleteController = require("../controllers/autoCompleteController");

const router = express.Router();

router.post("/", autoCompleteController.getAutoComplete);

module.exports = router;
