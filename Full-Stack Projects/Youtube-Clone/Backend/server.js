import express from "express";
import dotenv, { configDotenv } from "dotenv";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import videoRoutes from "./routes/video.route.js";
import commentRoutes from "./routes/comment.route.js";

// database connection file
import connectMongoDB from "./DB/connectMongoDB.js";

// to read env file data
dotenv.config();

const app = express();

// API's or Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);




app.listen(8800, () =>{
    console.log("server running on port");
    connectMongoDB();
})