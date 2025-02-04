import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import "./Passport/github.auth.js";
import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/user.route.js";
import exploreRoutes from "./Routes/explore.route.js"
import connectMongoDB from "./DB/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(cors());

// from passport
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


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