import express from "express";
import { getUser,updateUser,showUserById } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/get-user", userAuth, getUser);

router.get("/get-user/:id",showUserById);

router.put("/update-user", userAuth, updateUser);

export default router;