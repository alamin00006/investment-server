import express from "express";
import {
  createInvest,
  getAllInvest,
  getUserAllInvest,
  getUserLastInvest,
  updateInvest,
} from "./investment.controller.js";

const router = express.Router();
router.route("/:userId/all").get(getUserAllInvest); // Changed path to avoid conflict
router.route("/:userId/last").get(getUserLastInvest); // Changed path to avoid conflict
router.route("/:id").patch(updateInvest);
router.post("/", createInvest);
router.get("/", getAllInvest);

export default router;
