import express from "express";
import { getLikes, getUserProfileAndRepo, likeProfile } from "../Controllers/user.controller.js";
import {ensureAuthenticated} from "../Middleware/ensureAuthenticated.js"

const router = express.Router();

// basic routing
// router.get("/profile", (req, res) => {
//     res.send("User profile");
// })

router.get("/profile/:username", getUserProfileAndRepo)

// get likes (who liked your profile)
router.get("/likes", ensureAuthenticated, getLikes);

// like profile
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;