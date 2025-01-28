const propertyDetailsService = require("../services/propertyDetailsService");

exports.getPropertyDetails = async (req, res) => {
  try {
    const data = req.body; // Input data from the request body
    const result = await propertyDetailsService.fetchPropertyDetails(data);
    return res.status(200).json({
      message: "Property details fetched successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch property details",
      error: error.message,
    });
  }
};
