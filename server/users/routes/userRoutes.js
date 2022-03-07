import express from "express";
import {
  registerUser,
  getAllUsers,
  accessViaLogin,
} from "../controllers/userControllers.js";

const users = express.Router();

users.get("/", getAllUsers);
users.post("/register", registerUser);
users.post("/login", accessViaLogin);

export default users;
