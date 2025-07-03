const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
}

async function signupUser({ name, email, password, role }) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw { message: "Email already taken" };
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return {
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw { message: error.message || "Something went wrong while signup" };
  }
}

async function loginUser({ email, password }) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("Invalid credentials");

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) throw new Error("Invalid credentials");

    return {
      token: generateToken(existingUser),
      user: {
        id: existingUser._id,
        name: existingUser.name,
        role: existingUser.role,
      },
    };
  } catch (error) {
    throw { message: error.message || "Something went wrong while signup" };
  }
}

module.exports = { signupUser, loginUser };
