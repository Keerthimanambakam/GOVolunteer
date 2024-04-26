import express from "express";
import authRoute from "./authRoutes.js";
import jobRoute from "./jobroute.js";// Assuming you have a file named jobRoute.js
import userRoute from "./userRoutes.js"


const router = express.Router();
const path = "/api/";

router.use(path+"auth", authRoute); 
router.use(path+"jobs", jobRoute); 

router.use(path+"user", userRoute);

export default router;
