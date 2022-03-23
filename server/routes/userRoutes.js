import express from "express";
import {
  registerUser,
  getAllUsers,
  accessViaLogin,
  logout,
} from "../controllers/userControllers.js";

const users = express.Router();

users.get("/", getAllUsers);
users.post("/register", registerUser);
users.post("/login", accessViaLogin);
users.get("/logout", logout);

export default users;
