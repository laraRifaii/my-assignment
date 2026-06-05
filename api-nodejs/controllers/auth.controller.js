const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../data/user");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({
    success: true,
    token,
  });
};

module.exports = {
  login,
};