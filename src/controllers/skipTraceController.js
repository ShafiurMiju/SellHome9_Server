const skipTraceService = require("../services/skipTraceService");

exports.processSkipTrace = async (req, res) => {
  try {
    const data = req.body; // Input data from the request body
    const result = await skipTraceService.processSkipTrace(data);
    return res.status(200).json({
      message: "Skip trace processed successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to process skip trace",
      error: error.message,
    });
  }
};
