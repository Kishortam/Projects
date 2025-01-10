import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); 
const PORT = process.env.PORT || 5000;

// to check whats we get on browser on start
// app.get("/", (req, res)=>{
//     res.send("server is ready");
// });

// Middlewares
// // to parse req.body
app.use(express.json()); // middleware // runs betn req and res 
app.use(express.urlencoded({extended: true})); // to parse form data (urlencoded)
app.use(cookieParser());

// // we can read .env file using this command
// // console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectMongoDB();
});

