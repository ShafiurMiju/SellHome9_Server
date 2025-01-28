const axios = require("axios");
const { avmApiUrl, avmWebhookUrl } = require("../config/apiConfig");
const avmModel = require("../models/avmModel");

exports.processAVM = async (data) => {
  try {
    const email = { email: data.email };
    delete data.email;

    // Call the AVM API
    const apiResponse = await axios.post(avmApiUrl, data, {
      headers: {
        "x-api-key": process.env.REAL_ESTATE_API_KEY_AVM, // Set in .env file
        "Content-Type": "application/json",
      },
    });

    // Transform the response
    const transformedData = avmTransformer.transform(apiResponse.data);

    // Include email for webhook
    const payload = { ...transformedData, ...email };

    // Send data to webhook
    await axios.post(avmWebhookUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Save data to database
    // await avmModel.insertAVM(payload);

    return payload;
  } catch (error) {
    console.error("Error processing AVM data:", error.message);
    throw new Error("AVM service failed");
  }
};
