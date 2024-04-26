

import express from "express";
import jobController from '../controllers/jobController.js';

const router = express.Router();
4
router.get('/', jobController.showAllJobs);

router.get('/:id', jobController.showJob);

router.post('/', jobController.createJob);

router.put('/:id', jobController.updateJob);

router.delete('/:id', jobController.deleteJob);

export default router;