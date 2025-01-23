import { Router } from "express";
import { getAllSongs } from "../controller/song.controller.js";
import {protectRoute, requireAdmin} from "../middleware/auth.middleware.js";
import { featuredSongs } from "../controller/song.controller.js";
import { getMadeForYouSongs } from "../controller/song.controller.js";
import { getTrendingSongs } from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", featuredSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;