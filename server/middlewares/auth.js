import ErrorHandler from "../utils/ErrorHandler.js";
import { AsyncErrors } from "./AsyncErrors.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";

export const isAuthenticated = AsyncErrors(async (req, res, next) => {
  const { jwToken } = req.cookies;
  if (!jwToken) return next(new ErrorHandler(401, `You need to login first!`));

  const verifyAuth = jwt.verify(jwToken, process.env.JWT_KEY);
  req.user = await UserModel.findById(verifyAuth.user);
  // console.log(req.user);
  next();
});

export const isAdmin = (...roles) => {
  return AsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role))
      return next(
        new ErrorHandler(
          403,
          `Role ${role} is not allowed to access this resource`
        )
      );
    next();
  });
};
