const ErrorResponse = require("../utils/errorRes");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

//   console.log(err);

  if (error.code === 11000) {
    const message = `Duplicate Filed Value Enter`;
    error = new ErrorResponse(message, 400);
  }

  if (error.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server  Error !!!!!",
  });
};

module.exports = errorHandler;
