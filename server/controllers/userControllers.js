// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { AsyncErrors } from "../middlewares/AsyncErrors.js";

import UserModel from "../models/userSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// User Routes
export const registerUser = AsyncErrors(async (req, res, next) => {
  const { email } = req.body;
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

export const loginUser = AsyncErrors(async (req, res, next) => {
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

export const logoutUser = AsyncErrors(async (req, res, next) => {
  res.cookie(`jwToken`, null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({ message: `You've logged out successfully` });
});

export const getUserDetails = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.user.id);
  return res
    .status(200)
    .json({ message: `Here are your personal details`, requiredUser });
});

export const updateUserDetails = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.user.id);
  const updatedUser = { ...requiredUser._doc, ...req.body };
  await UserModel.findByIdAndUpdate(requiredUser.id, updatedUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res
    .status(200)
    .json({ message: `Here are your updated personal details`, updatedUser });
});

export const updateUserPassword = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.user.id).select(
    "+password"
  );
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const doesOldPassMatch = await requiredUser.comparePassword(oldPassword);
  if (!doesOldPassMatch)
    return next(new ErrorHandler(400, `Your old password does not match :(`));

  if (oldPassword === newPassword)
    return next(new ErrorHandler(400, `Try enterring different password`));
  if (newPassword !== confirmPassword)
    return next(new ErrorHandler(400, `Your new password does not match :(`));

  requiredUser.password = newPassword;

  await requiredUser.save();
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
    .json({ message: `You've updated your password successfully`, jwToken });
});

// Special Admin Routes
export const getAllUsers = AsyncErrors(async (req, res, next) => {
  const allUsers = await UserModel.find();
  if (allUsers.length !== 0)
    return res
      .status(201)
      .json({ message: `These users have registered on your app`, allUsers });
  return next(
    new ErrorHandler(400, `There aren't any users registered on your app`)
  );
});

export const getSpecificUser = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.params.id);
  if (requiredUser)
    return res
      .status(201)
      .json({ message: `You're required user is here`, requiredUser });
});

export const updateUserRole = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.params.id);
  const updatedUser = { ...requiredUser._doc, ...req.body };
  await UserModel.findByIdAndUpdate(requiredUser.id, updatedUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    message: `You succesfully updated role of this user`,
    updatedUser,
  });
});

export const deleteUser = AsyncErrors(async (req, res, next) => {
  const requiredUser = await UserModel.findById(req.params.id);
  if (requiredUser) {
    requiredUser.remove();
    return res
      .status(200)
      .json({ message: `You've successfully deleted this user`, requiredUser });
  }
  return next(
    new ErrorHandler(400, `This user with id: ${req.params.id} does not exist`)
  );
});
