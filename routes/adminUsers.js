import express from "express";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminJWT,
  getAdminUser,
  getAdminUsers,
  loginAdminUser,
  updateAdminPassword,
  updateAdminUser,

  //   updateUserAdmin,
} from "../controllers/adminUser.js";

const router = express.Router();

router.post("/", createAdminUser);
router.post("/login", loginAdminUser);
router.patch("/:id", updateAdminUser);
// router.patch("/admin/:id", updateUserAdmin);
router.put("/:email", updateAdminPassword);
router.delete("/:id", deleteAdminUser);
router.get("/", getAdminUsers);
// router.get("/manager", getAdminManager);
router.get("/:id", getAdminUser);
router.get("/jwt", getAdminJWT);
// router.get("/admin/:email", getAdmin);

export default router;
