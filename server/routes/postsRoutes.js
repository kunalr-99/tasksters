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
posts.get("/", getPosts);

// Get specific post by title
posts.get("/t/:title", isAuthenticated, getSpecificPostByTitle);

// Get specific post by category
posts.get("/c/:category", isAuthenticated, getSpecificPostByCategory);

// Update a post
posts.put(
  "/:title",
  isAuthenticated,
  isAdmin("admin"),
  updateSpecificPostByTitle
);

// Delete a post
posts.delete(
  "/:title",
  isAuthenticated,
  isAdmin("admin"),
  deleteSpecificPostByTitle
);

export default posts;
