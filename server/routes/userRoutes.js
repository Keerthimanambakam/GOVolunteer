import express from "express";
import { getUser,updateUser } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/get-user", userAuth, getUser);

router.put("/update-user", userAuth, updateUser);

export default router;