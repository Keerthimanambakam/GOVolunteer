import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js"


const router = express.Router();

const path = "/api/";

router.use(path+"auth", authRoute); 
router.use(path+"user", userRoute);

export default router;