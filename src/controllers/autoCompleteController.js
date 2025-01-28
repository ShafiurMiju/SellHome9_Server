const autoCompleteService = require("../services/autoCompleteService");

exports.getAutoComplete = async (req, res) => {
  try {
    const data = req.body; // Input data from the request body
    const result = await autoCompleteService.fetchAutoComplete(data);
    return res.status(200).json({
      message: "Auto-complete fetched successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch auto-complete",
      error: error.message,
    });
  }
};
