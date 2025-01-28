const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

exports.getUserByEmail = async (email) => {
  const connection = await getConnection();
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await connection.execute(query, [email]);
    return rows[0]; // Return the first matching user
  } finally {
    await connection.end();
  }
};

exports.getUserById = async (id) => {
  const connection = await getConnection();
  try {
    const query = `SELECT id, name, email FROM users WHERE id = ?`;
    const [rows] = await connection.execute(query, [id]);
    return rows[0]; // Return the first matching user
  } finally {
    await connection.end();
  }
};
