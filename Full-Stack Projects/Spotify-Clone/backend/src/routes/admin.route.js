import { Router } from "express";
import { admin } from "../controller/admin.controller.js";

const router = Router();

router.get("/", admin)

export default router;