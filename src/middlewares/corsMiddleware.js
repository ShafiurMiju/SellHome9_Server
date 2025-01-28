const cors = require("cors");

// const corsMiddleware = cors({
//   origin: process.env.CORS_ORIGIN || "*", // Specify allowed origins (default to all origins)
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
//   credentials: true, // Allow credentials (e.g., cookies, authorization headers)
//   allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Allowed headers
// });




const corsMiddleware = cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });






module.exports = corsMiddleware;
