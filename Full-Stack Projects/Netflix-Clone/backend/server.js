import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./Routes/auth.route.js";
import movieRoutes from "./Routes/movie.route.js";
import tvRoutes from "./Routes/tv.route.js";
import searchRoutes from "./Routes/search.route.js";

import { connectDB } from "./DB/connectDB.js";
import { protectRoute } from "./Middleware/protectRoute.js";

dotenv.config();  // to read .env file

const app = express();
const PORT = process.env.PORT || 5000;
// 
const __dirname = path.resolve();

// basic code to see on client or browser
// app.get("/", (req, res) => {
//     res.send("Hello from backend");
// })

app.use(express.json()); // middleware will allows us to parse req.body
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);


// deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})


