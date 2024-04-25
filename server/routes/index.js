import express from "express";

import authRoute from "./authRoutes.js";


const router = express.Router();

const path = "/api/";

router.use(path+"auth", authRoute); 


export default router;