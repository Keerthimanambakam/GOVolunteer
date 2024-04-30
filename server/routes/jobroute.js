import express from "express";
import jobController from '../controllers/jobController.js';
import userAuth from "../middleware/authMiddleware.js";



const router = express.Router();
4
router.get('/find-oppurtunities', jobController.showAllJobs);

router.get('/get-job/:id', jobController.showJob);

router.post("/upload-job", userAuth, jobController.createJob);

router.post("/apply-job", userAuth, jobController.applyJob);

router.put("/update-job/:jobId", userAuth, jobController.updateJob);

router.delete('/delete-job/:id', userAuth,jobController.deleteJob);

export default router;