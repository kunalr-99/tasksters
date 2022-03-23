import express from "express";
import {
  getPosts,
  createPost,
  getSpecificPostByTitle,
  getSpecificPostByCategory,
  updateSpecificPostByTitle,
  deleteSpecificPostByTitle,
} from "../controllers/postControllers.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const posts = express.Router();

// Create a post
posts.post("/", isAuthenticated, createPost);
//Get all posts
posts.get("/", isAuthenticated, isAdmin("admin"), getPosts);
// Get specific post by title
posts.get("/t/:title", getSpecificPostByTitle);
// Get specific post by category
posts.get("/c/:category", getSpecificPostByCategory);
// Update a post
posts.put("/:title", isAuthenticated, updateSpecificPostByTitle);
// Delete a post
posts.delete("/:title", isAuthenticated, deleteSpecificPostByTitle);

export default posts;
