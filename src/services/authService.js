const userModel = require("../models/userModel");

exports.loginUser = async ({ email, password }) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Temporarily skip password validation for now
  // This would be replaced with proper bcrypt password comparison
  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

exports.getUserById = async (userId) => {
  const user = await userModel.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
