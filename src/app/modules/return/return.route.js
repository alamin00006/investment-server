import express from "express";
import { getAllReturn, updateReturn } from "./return.controller.js";

const router = express.Router();
router.get("/", getAllReturn);
router.route("/:id").patch(updateReturn);

export default router;
