const express = require("express");

// Import individual route modules
const skipTraceRoutes = require("./skipTraceRoutes");
const autoCompleteRoutes = require("./autoCompleteRoutes");
const propertyDetailsRoutes = require("./propertyDetailsRoutes");
const compsRoutes = require("./compsRoutes");
const authRoutes = require("./authRoutes");
const avmRoutes = require("./avmRoutes"); // Added AVM routes

const router = express.Router();

// Attach route modules with prefixes
router.use("/skip-trace", skipTraceRoutes); // For /skip-trace
router.use("/autocomplete", autoCompleteRoutes); // For /auto-complete
router.use("/property-details", propertyDetailsRoutes); // For /property-details
router.use("/comps", compsRoutes); // For /comps
router.use("/auth", authRoutes); // For /auth
router.use("/avm", avmRoutes); // For /avm

module.exports = router;
