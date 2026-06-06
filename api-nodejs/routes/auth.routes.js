const express = require("express");
const router = express.Router();
const {
  loginSchema,
} = require("../models/login.schema.ts");
const validate = require(
  "../middleware/authValidation.middleware"
);
const { login } = require("../controllers/auth.controller");

router.post("/login", validate(loginSchema), login);

module.exports = router;