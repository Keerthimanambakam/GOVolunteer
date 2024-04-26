import express from "express";
import { getUser,updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.patch("/:id", updateUser);

export default router;