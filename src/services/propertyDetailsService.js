const axios = require("axios");
const {
  propertyDetailApiUrl,
  propertyDetailWebhookUrl,
} = require("../config/apiConfig");
const propertyDetailsTransformer = require("../transformers/propertyDetailsTransformer");
const propertyDetailsModel = require("../models/propertyDetailsModel");

exports.fetchPropertyDetails = async (data) => {
  try {
    const email = { email: data.email };

    delete data.email;

    // Send the input data to the Property Details API
    const apiResponse = await axios.post(propertyDetailApiUrl, data, {
      headers: {
        "x-api-key": process.env.REAL_ESTATE_API_KEY, // Ensure the key is in your `.env`
        "Content-Type": "application/json",
      },
    });

    // Transform the API response data
    const transformedData = propertyDetailsTransformer.transform(
      apiResponse.data
    );

    // Include email with transformed data before sending to the webhook
    const payload = { ...transformedData, ...email };

    // Send the transformed data to the webhook
    await axios.post(propertyDetailWebhookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dbResult = await propertyDetailsModel.insertProperty(payload);
    // Return the final result to the controller

    return {
      payload,
      dbResult,
    };
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    throw new Error("Property details service failed");
  }
};
