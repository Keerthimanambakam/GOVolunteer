import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js"


const router = express.Router();

const path = "/api/";

<<<<<<< HEAD
router.use(path+"auth", authRoute); 
router.use(path+"user", userRoute);
=======
router.use(`${path}auth`, authRoute); 

>>>>>>> f2311a472c039aa891209fbcd566aa65d1b48518

export default router;