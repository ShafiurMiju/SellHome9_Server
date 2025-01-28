const axios = require("axios");
const { autoCompleteApiUrl } = require("../config/apiConfig");

exports.fetchAutoComplete = async (data) => {
  try {
    const response = await axios.post(autoCompleteApiUrl, data, {
      headers: {
        "x-api-key": process.env.REAL_ESTATE_API_KEY, // Ensure the key is in your `.env`
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching auto-complete data:", error.message);
    throw new Error("Auto-complete service failed");
  }
};
