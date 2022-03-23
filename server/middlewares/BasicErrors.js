import ErrorHandler from "../utils/ErrorHandler.js";

export const BasicErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || `Fishy situation: ${err.message}`;

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(302, message);
  }

  res.status(err.statusCode).json({ message: err.message });
};
