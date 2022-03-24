import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
  getAllUsers,
  getSpecificUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userControllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const users = express.Router();

users.post("/register", registerUser);
users.post("/login", loginUser);
users.get("/logout", isAuthenticated, logoutUser);
users.get("/me", isAuthenticated, getUserDetails);
users.put("/me", isAuthenticated, updateUserDetails);
users.put("/me/password/update", isAuthenticated, updateUserPassword);
users.get("/admin/users", isAuthenticated, isAdmin("admin"), getAllUsers);
users.get(
  "/admin/user/:id",
  isAuthenticated,
  isAdmin("admin"),
  getSpecificUser
);
users.put("/admin/user/:id", isAuthenticated, isAdmin("admin"), updateUserRole);
users.delete("/admin/user/:id", isAuthenticated, isAdmin("admin"), deleteUser);

export default users;
