import express from 'express';
import { cancelAppointment, docLogin, doctorDashboard, doctorList, doctorProfile, getDoctorAppointments, markAppointmentCompleted, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', docLogin);
doctorRouter.get('/appointments', authDoctor, getDoctorAppointments);
doctorRouter.post('/complete-appointment', authDoctor, markAppointmentCompleted);
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);
export default doctorRouter;