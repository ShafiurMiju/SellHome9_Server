const compsService = require("../services/compsService");

exports.getComps = async (req, res) => {
  try {
    const data = req.body; // Request body containing input data
    const result = await compsService.processComps(data); // Call the service to process comps
    res.status(200).json({
      message: "Comps data processed successfully",
      result,
    });
  } catch (error) {
    console.error("Error in handleCompsRequest:", error.message);
    res.status(500).json({
      message: "Failed to process comps data",
      error: error.message,
    });
  }
};
