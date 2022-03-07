// Package imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// DataBase imports
import { dbConnect } from "./database/dbConnect.js";

// File imports
import posts from "./posts/routes/postsRoutes.js";
import users from "./users/routes/userRoutes.js";

// Environment variable initialized
dotenv.config();

// Middleware connections
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/posts", posts);
app.use("/users", users);

// Routes
app.get("/", (req, res) => res.send("Base route"));

// Listeners
const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbConnect()
    .then(() => {
      console.log(
        `DB Connection successful and server running on http://localhost:${port}`
      );
    })
    .catch((err) => {
      console.log(`Something messed here: ${err.message}`);
    });
});
