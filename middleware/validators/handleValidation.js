const { validationResult } = require("express-validator");

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array().map((err) => err.msg),
    });
  }
  next();
}

module.exports = { handleValidation };
