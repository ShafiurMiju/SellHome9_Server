const avmService = require("../services/avmService");

exports.getAVM = async (req, res) => {
  try {
    const data = req.body;
    const result = await avmService.processAVM(data);

    res.status(200).json({
      message: "Property AVM data processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching AVM data:", error.message);
    res.status(500).json({
      message: "An error occurred while processing AVM data",
      error: error.message,
    });
  }
};
