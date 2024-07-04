import express from "express";
import {
  getAllTransaction,
  getUserTransactions,
  updateTransaction,
} from "./transaction.controller.js";

const router = express.Router();

router.get("/", getAllTransaction);
router.get("/:userId", getUserTransactions);
router.route("/:id").patch(updateTransaction);

export default router;
