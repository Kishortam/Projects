import express from "express"
import { explorePopularRepos } from "../Controllers/explore.controller.js";
// import { ensureAuthenticated } from "../Middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/repos/:language",  explorePopularRepos)

export default router;