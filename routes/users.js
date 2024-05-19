import express from "express";
import {
  createUser,
  deleteUser,
  getAdmin,
  getJWT,
  getManager,
  getUser,
  getUsers,
  loginUser,
  updatePassword,
  updateUser,
  updateUserAdmin,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.patch("/:id", updateUser);
router.patch("/admin/:id", updateUserAdmin);
router.put("/:email", updatePassword);
router.delete("/:id", deleteUser);
router.get("/", getUsers);
router.get("/manager", getManager);
router.get("/:id", getUser);
router.get("/jwt", getJWT);
router.get("/admin/:email", getAdmin);

export default router;
