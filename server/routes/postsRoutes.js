import express from "express";
import {
  getPosts,
  createPost,
  getSpecificPostByTitle,
  getSpecificPostByCategory,
  updateSpecificPostByTitle,
  deleteSpecificPostByTitle,
} from "../controllers/postControllers.js";

const posts = express.Router();

// Create a post
posts.post("/", createPost);
//Get all posts
posts.get("/", getPosts);
// Get specific post by title
posts.get("/t/:title", getSpecificPostByTitle);
// Get specific post by category
posts.get("/c/:category", getSpecificPostByCategory);
// Update a post
posts.put("/:title", updateSpecificPostByTitle);
// Delete a post
posts.delete("/:title", deleteSpecificPostByTitle);

export default posts;
