import { Router } from "express";

const router = Router();

router.get("/", (req, res)=>{
    res.send("Happy Diwali");
})

export default router;