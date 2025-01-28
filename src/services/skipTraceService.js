const axios = require("axios");
const { skipTraceApiUrl, skipTraceWebhookUrl } = require("../config/apiConfig");
const skipTraceTransformer = require("../transformers/skipTraceTransformer");

exports.processSkipTrace = async (data) => {
  try {
    // Send the input data to the Skip Trace API
    const apiResponse = await axios.post(skipTraceApiUrl, data, {
      headers: {
        "x-api-key": process.env.REAL_ESTATE_API_KEY, // Ensure the key is in your `.env`
        "Content-Type": "application/json",
      },
    });

    // Transform the API response data
    const transformedData = skipTraceTransformer.transform(apiResponse.data);

    // Send the transformed data to the webhook
    await axios.post(skipTraceWebhookUrl, transformedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return transformedData;
  } catch (error) {
    console.error("Error processing skip trace:", error.message);
    throw new Error("Skip trace service failed");
  }
};
