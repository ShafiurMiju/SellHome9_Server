const express = require("express");
const allRoutes = require("./src/routes/allRoutes"); // Updated path
// const connectDB = require("./src/config/dbConfig"); // Updated path for clarity
const corsMiddleware = require("./src/middlewares/corsMiddleware"); // Adjust the path to your structure


require("dotenv").config();

const app = express();
app.use(express.json());

// Database connection
// (async () => {
//   try {
//     await connectDB();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//     process.exit(1); // Exit the app if database connection fails
//   }
// })();

// Routes
app.use("/api", allRoutes);

app.use(corsMiddleware);


module.exports = app;
