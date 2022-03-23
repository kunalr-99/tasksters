// Package imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// DataBase imports
import { dbConnect } from "./config/dbConfig.js";

// File imports
import posts from "./routes/postsRoutes.js";
import users from "./routes/userRoutes.js";
import { BasicErrors } from "./middlewares/BasicErrors.js";

// Uncaught exception error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to Uncaught Exception!`);
  process.exit(1);
});

// Environment variable path set and initialized
dotenv.config({ path: "./config/config.env" });

// Middleware connections
// Server mids
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Route mids
app.use("/posts", posts);
app.use("/users", users);

// Error mids
app.use(BasicErrors);

// Routes
app.get("/", (req, res) => res.send("Base route"));

// Listeners
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  dbConnect().then(() => {
    console.log(
      `DB Connection successful and server running on http://localhost:${port}`
    );
  });
});

// Unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server shutting down due to Unhandled Promise Rejection!`);
  server.close(() => process.exit(1));
});
