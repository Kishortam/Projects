import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/user.route.js";
import exploreRoutes from "./Routes/explore.route.js"
import connectMongoDB from "./DB/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(cors());


// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);




// server
app.listen(7000, () => {
    console.log("Server is running on port 7000");
    connectMongoDB();
});