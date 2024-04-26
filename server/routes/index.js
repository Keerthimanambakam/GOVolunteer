import express from "express";
<<<<<<< HEAD

import authRoute from "./authRoutes.js";


const router = express.Router();

const path = "/api/";

router.use(`${path}auth`, authRoute); 


export default router;
=======
import authRoute from "./authRoutes.js";
import jobRoute from "./jobroute.js";// Assuming you have a file named jobRoute.js
import userRoute from "./userRoutes.js"
import companyRoute from "./companyRoute.js"

const router = express.Router();
const path = "/api/";

router.use(path+"auth", authRoute); 
router.use(path+"company", companyRoute); 
router.use(path+"jobs", jobRoute); 
router.use(path+"user", userRoute);

export default router;
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
