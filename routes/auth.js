const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validators/authValidator");
const {
  handleValidation,
} = require("../middleware/validators/handleValidation");

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, handleValidation, signup);
authRouter.post("/login", loginValidation, handleValidation, login);

module.exports = { authRouter };
