import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AsyncErrors } from "../middlewares/AsyncErrors.js";

import UserModel from "../models/userSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllUsers = AsyncErrors(async (req, res, next) => {
  const allUsers = await UserModel.find();
  if (allUsers.length !== 0)
    return res
      .status(201)
      .json({ message: `These users have registered on your app`, allUsers });
  return next(
    new ErrorHandler(400, `There aren't any users registered on your app`)
  );
  // return res
  // .status(302)
  // .json({ message: `There aren't any users registered on your app` });
});

//
export const registerUser = AsyncErrors(async (req, res, next) => {
  const { fname, lname, email, password } = req.body;
  const requiredUser = await UserModel.findOne({ email });
  if (!requiredUser) {
    const newUser = await UserModel.create(req.body);
    const jwToken = await newUser.generateJwToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    return res
      .status(201)
      .cookie(`jwToken`, jwToken, options)
      .json({ message: `User registeration successful`, jwToken });
  }
  return next(
    new ErrorHandler(
      400,
      `You already have registered on this app. Try logging in with your credentials`
    )
  );
});

export const accessViaLogin = AsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const requiredUser = await UserModel.findOne({ email }).select("+password");

  if (requiredUser) {
    const verifyPass = await requiredUser.comparePassword(password);
    if (!verifyPass)
      return next(
        new ErrorHandler(401, `Your credentials are invalid. Try Again`)
      );

    const jwToken = await requiredUser.generateJwToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    return res
      .status(200)
      .cookie(`jwToken`, jwToken, options)
      .json({ message: `You've logged in successfully`, jwToken });
  }

  return next(new ErrorHandler(400, `You haven't yet registered on this app`));
});

export const logout = AsyncErrors(async (req, res, next) => {
  res.cookie(`jwToken`, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({ message: `You've logged out successfully` });
});
