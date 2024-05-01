import express from 'express';
import { rateLimit } from "express-rate-limit";
import companyController from '../controllers/companyController.js';
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
});

router.get('/', companyController.showAllComapanies);

router.get("/get-company/:id", companyController.showCompanyById);

router.post('/get-company',userAuth, companyController.showCompany);

router.post('/register', limiter,companyController.register);
router.post('/login',limiter, companyController.signIn);

router.put('/update-company', companyController.updateCompany);

router.delete('/company-delete', companyController.deleteCompany);

router.post('/get-company-jobs', companyController.showAllJobsPosted);

export default router;
