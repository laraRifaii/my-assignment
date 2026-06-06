const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../data/user.ts");

const loginUser = async (email, password) => {
  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    throw {
      status: 401,
      message: "Invalid credentials",
    };
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw {
      status: 401,
      message: "Invalid credentials",
    };
  }

  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = {
  loginUser,
};