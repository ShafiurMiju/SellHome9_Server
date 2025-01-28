require("dotenv").config(); // Load environment variables from .env

const apiConfig = {
  // Real Estate API Configurations
  realEstateApiKey: process.env.REAL_ESTATE_API_KEY,
  autoCompleteApiUrl: process.env.AUTO_COMPLETE_API_URL,
  skipTraceApiUrl: process.env.SKIP_TRACE_API_URL,
  propertyDetailApiUrl: process.env.PROPERTY_DETAIL_API_URL,
  propertyCompsApiUrl: process.env.PROPERTY_COMPS_API_URL,
  propertyAVMApiUrl: process.env.PROPERTY_AVM_API_URL,

  // Webhook URLs
  skipTraceWebhookUrl: process.env.SKIP_TRACE_WEBHOOK_URL,
  propertyDetailWebhookUrl: process.env.PROPERTY_DETAIL_WEBHOOK_URL,
  propertyCompsWebhookUrl: process.env.PROPERTY_COMPS_WEBHOOK_URL,
  propertyAVMWebhookUrl: process.env.PROPERTY_AVM_WEBHOOK_URL,
};

module.exports = apiConfig;
