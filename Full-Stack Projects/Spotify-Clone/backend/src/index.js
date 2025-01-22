import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express';

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"




// configuration of dotenv file: to read dotenv file data
dotenv.config();

const app = express();

const PORT = process.env.port || 5000;

app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth.userId


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);




app.listen(PORT, ()=>{
    console.log("server is running on port " + PORT);
    connectDB();
})