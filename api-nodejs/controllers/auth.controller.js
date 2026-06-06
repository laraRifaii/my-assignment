const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.loginUser(
      email,
      password
    );

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message:
        error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  login,
};