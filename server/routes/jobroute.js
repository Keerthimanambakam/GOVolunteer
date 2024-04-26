

import express from "express";
import jobController from '../controllers/jobController.js';

const router = express.Router();
4
router.get('/jobs', jobController.showAllJobs);

router.get('/jobs/:id', jobController.showJob);

router.post('/jobs', jobController.createJob);

router.put('/jobs/:id', jobController.updateJob);

router.delete('/jobs/:id', jobController.deleteJob);
router.get("/", (req, res) => {
  res.send("Job routes");
});

export default router;