import express from "express";
import { createInvest, getUserLastInvest } from "./invest.controller.js";

const router = express.Router();

router.post("/", createInvest);
router.get("/:userId", getUserLastInvest);

export default router;
