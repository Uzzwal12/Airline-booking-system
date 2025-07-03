const { signupUser, loginUser } = require("../services/authService");

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const user = await signupUser({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    console.log("Error while signup", error);
    res.status(error.status || "400").json({
      message: error.message || "Something went wrong",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log("Error while login", error);
    res.status(error.status || "400").json({
      message: error.message || "Something went wrong",
    });
  }
}

module.exports = { signup, login };
