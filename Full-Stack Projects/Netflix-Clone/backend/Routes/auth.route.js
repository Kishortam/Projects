import express from "express"
import { authCheck, login, logout, signup } from "../Controllers/auth.controller.js";
import { protectRoute } from "../Middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);


export default router;