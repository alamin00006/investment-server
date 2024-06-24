import express from "express";
import {
  createInvest,
  getAllInvest,
  getUserLastInvest,
  //updateInvest,
} from "./invest.controller.js";

const router = express.Router();

router.post("/", createInvest);
router.get("/", getAllInvest);
router.get("/:userId", getUserLastInvest);
//router.route("/:id").patch(updateInvest);

export default router;
