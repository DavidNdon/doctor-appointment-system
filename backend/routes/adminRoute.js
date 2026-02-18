import express from 'express';
import upload from '../middlewares/multer.js';
import { addDoctor, adminLogin, allDoctors, adminAppointments, adminDashboard } from '../controllers/adminController.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// Example admin route
adminRouter.post('/add-doctor',authAdmin ,upload.single('image'), addDoctor);
adminRouter.post('/admin-login', adminLogin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/admin-appointments', authAdmin, adminAppointments);
adminRouter.get('/admin-dashboard', authAdmin, adminDashboard);

export default adminRouter;