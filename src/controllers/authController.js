const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming user ID is passed as a route parameter
    const user = await authService.getUserById(userId);
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};
