import express from "express";
import { getUserProfileAndRepo } from "../Controllers/user.controller.js";

const router = express.Router();

// basic routing
// router.get("/profile", (req, res) => {
//     res.send("User profile");
// })

router.get("/profile/:username", getUserProfileAndRepo)

export default router;