import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// adding doctor 
const addDoctor = async (req, res) => {

    try {
        
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;

        const imageFile = req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({success: false, message: "All fields are required"});

        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Invalid email format" });
        }

        // validate password strength
        if (password.length < 8) {
             return res.status(400).json({success: false, message: "Password must be atleast 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now(),
            image: imageUrl
        };
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({success: true, message: "Doctor added successfully", doctor: newDoctor});

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({success: false, message: "Internal server error" });
    }
};

// admin login
const adminLogin = async (req, res) => {
    try {

        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.status(200).json({success: true, message: "Admin logged in successfully", token: token });
            
        }else {
            return res.status(401).json({success: false, message: "Invalid admin credentials" });
        }
        
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({success: false, message: "Internal server error" });
    }
};

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find().select('-password');
        res.status(200).json({success: true, doctors: doctors });
        
    } catch (error) {
        console.error("Error finding doctors:", error);
        res.status(500).json({success: false, message: "Internal server error" });
    }
}

const adminAppointments = async (req, res) => {

    try {
        
        const appointments = await appointmentModel.find({});
        res.status(200).json({success: true, appointments: appointments });


    } catch (error) {
        console.error("Error finding doctors:", error);
        res.status(500).json({success: false, message: "Internal server error" });
    }
}

// add info to admin dashboard

const adminDashboard = async (req, res) => {

    try {
        
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashboardData = {
            totalDoctors: doctors.length,
            totalUsers: users.length,
            totalAppointments: appointments.length,
            latestappointments: appointments.reverse().slice(0, 5) // Get the latest 5 appointments
        };

        res.status(200).json({success: true, dashboardData: dashboardData });

    } catch (error) {
        console.error("Error occured:", error);
        res.status(500).json({success: false, message: "Internal server error" });
    }


}

export {addDoctor, adminLogin, allDoctors, adminAppointments, adminDashboard};