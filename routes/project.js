import express from "express";

import {
  createProject,
  getProject,
  getProjectDetails,
} from "../controllers/project.js";
import { productFile } from "../middleware/uploads.js";

const router = express.Router();

router.post("/", productFile, createProject);
router.get("/", getProject);
router.get("/:id", getProjectDetails);
// router.delete("/:id", deleteBanner);
// router.put("/:id", updateBanner);

export default router;
