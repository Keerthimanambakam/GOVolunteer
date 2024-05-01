import express from "express";
import { getUser,updateUser,showUserById } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/get-user", userAuth, getUser);

router.get("/get-user/:id",showUserById);

router.patch("/update-user/:id", userAuth, updateUser);

export default router;