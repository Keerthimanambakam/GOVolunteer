import express from 'express';
import companyController from '../controllers/companyController.js';

const router = express.Router();

router.get('/', companyController.showAllComapanies);
router.get('/:id', companyController.showCompany);
router.post('/register', companyController.register);
router.post('/signin', companyController.signIn);
router.patch('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.get('/:id/jobs', companyController.showAllJobsPosted);

export default router;
