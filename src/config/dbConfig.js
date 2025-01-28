const mysql = require("mysql2/promise");
const { dbConfig } = require("../config/dbConfig");

const connectDB = async () => {
  try {
    const connection = await mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10, // Number of concurrent connections
      queueLimit: 0, // No limit for queueing connections
    });

    console.log("Database connection pool established successfully!");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application if database connection fails
  }
};

module.exports = connectDB;
