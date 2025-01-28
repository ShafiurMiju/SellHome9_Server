const axios = require("axios");
const compsTransformer = require("../transformers/compsTransformer.js");
const compsModel = require("../models/compsModel");
const { propertyCompsApiUrl, propertyCompsWebhookUrl } = require("../config/apiConfig");

exports.processComps = async (data) => {
  const { email, ...requestData } = data; // Extract email from request body

  try {
    // Fetch comps data from the external API
    const apiResponse = await axios.post(propertyCompsApiUrl, requestData, {
      headers: {
        "x-api-key": process.env.REAL_ESTATE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    // Transform the response data
    const transformedData = compsTransformer.transformComps(apiResponse.data);

    // Include email in the payload for webhook and database
    const payload = { ...transformedData, email };

    // Send the transformed data to the webhook
    await axios.post(propertyCompsWebhookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Save comps data into the database
    await compsModel.insertComps(payload);

    return { message: "Comps data processed and saved successfully", payload };
  } catch (error) {
    console.error("Error processing comps:", error.message);
    throw new Error("Failed to process comps data");
  }
};
