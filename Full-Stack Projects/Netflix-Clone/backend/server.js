import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.route.js";
import movieRoutes from "./Routes/movie.route.js";
import tvRoutes from "./Routes/tv.route.js";

import { connectDB } from "./DB/connectDB.js";
import { protectRoute } from "./Middleware/protectRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// basic code to see on client or browser
// app.get("/", (req, res) => {
//     res.send("Hello from backend");
// })

app.use(express.json()); // middleware will allows us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})


