import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (allUsers.length !== 0)
      return res
        .status(201)
        .json({ message: `These users have registered on your app`, allUsers });
    return res
      .status(302)
      .json({ message: `There aren't any users registered on your app` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

//
export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const requiredUser = await UserModel.findOne({ email });
    if (!requiredUser) {
      const salt = await bcrypt.genSalt(8);
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({
        fname,
        lname,
        email,
        password: hashedPass,
      });
      const jwToken = await jwt.sign({ user: newUser._id }, "tasksters");
      return res
        .status(201)
        .json({ message: `User registeration successful`, jwToken });
    }
    return res.status(302).json({
      message: `You already have registered on this app. Try logging in with your credentials`,
    });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};

export const accessViaLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const requiredUser = await UserModel.findOne({ email });

    if (requiredUser) {
      const verifyPass = await bcrypt.compare(password, requiredUser.password);
      if (verifyPass)
        return res
          .status(201)
          .json({ message: `You've logged in successfully` });
      return res
        .status(201)
        .json({ message: `Your credentials are invalid. Try Again` });
    }
    return res
      .status(302)
      .json({ message: `You haven't yet registered on this app` });
  } catch (err) {
    return res.status(500).json({ message: `Fishy situation: ${err}` });
  }
};
