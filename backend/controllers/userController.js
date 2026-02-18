import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
//import e from 'express';
import appointmentModel from '../models/appointmentModel.js';

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const userData = { name, email, password: hashedPassword };

        const newUser = new userModel(userData);
        const user = await newUser.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ success: true, token });

        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ success: true, token });
        
        
    } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message }); 
    }
}

const getProfile = async (req, res) => {
    try {

        const userData = await userModel.findById(req.user.id).select('-password');

        res.status(200).json({ success: true, userData: userData });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {

        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if ( !name || !phone || !dob || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile
        let addressData = address;
        if (typeof address === 'string') {
            try {
                addressData = JSON.parse(address);
            } catch (e) {
                // If parsing fails, use the string as line1
                addressData = { line1: address, line2: '' };
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
            name,
            phone,
            address: addressData,
            dob,
            gender
        }, { new: true });

        if (!updatedUser) {
            return res.status(500).json({ message: 'Failed to update profile' });
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});

            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(req.user.id, { image: imageUrl });
            res.status(200).json({ success: true, message: 'Profile updated with image' });
        } else {
            res.status(200).json({ success: true, message: 'Profile updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//api for appointment booking

const bookAppointment = async (req, res) => {
    try {

        const { docId, slotDate, slotTime } = req.body;
        const userId = req.user?.id;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData || !docData.available) {
            return res.status(400).json({ success: false, message: 'Doctor is not available for booking' });
        }

        // ensure slots_booked is an object
        const slots_booked = docData.slots_booked || {};
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(400).json({ success: false, message: 'Slot NOT available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        // prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData: (() => {
                const d = docData.toObject ? docData.toObject() : { ...docData };
                delete d.slots_booked;
                return d;
            })(),
            slotDate,
            slotTime,
            amount: docData.fees,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots_booked });

        res.status(200).json({ success: true, message: 'Appointment booked successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const listAppointments = async (req, res) => {
    try {

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const appointments = await appointmentModel.find({ userId });
        res.status(200).json({ success: true, appointments });

    } 
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//cancel appointment api 

const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData.userId.toString() !== userId) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancel: true });

        // free up the slot in doctor's schedule
        const docId = appointmentData.docId;
        const slotDate = appointmentData.slotDate;
        const slotTime = appointmentData.slotTime;
        const docData = await doctorModel.findById(docId);
        const slots_booked = docData.slots_booked || {};
        if (slots_booked[slotDate]) {
            const index = slots_booked[slotDate].indexOf(slotTime);
            if (index > -1) {
                slots_booked[slotDate].splice(index, 1);
                await doctorModel.findByIdAndUpdate(docId, { slots_booked: slots_booked });
            }
        }

        res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//API to make online payemnt using Mpesa
const paymentWithMpesa = async (req, res) => {
    try {
        const { appointmentId, phoneNumber, amount } = req.body;
        const userId = req.user?.id;

        if (!appointmentId || !phoneNumber || !amount) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Validate appointment exists and belongs to user
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment || appointment.userId.toString() !== userId) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Simulate M-Pesa payment processing
        const mpesaTransactionId = 'TXN' + Date.now();
        const paymentReference = 'PAY' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate random success (90% success rate for demo)
        const isSuccessful = Math.random() < 0.9;

        if (!isSuccessful) {
            return res.status(400).json({ 
                success: false, 
                message: 'Payment failed. Please try again.',
                transactionId: mpesaTransactionId
            });
        }

        // Update appointment with payment details
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            payment: true,
            paymentMethod: 'M-Pesa',
            transactionId: mpesaTransactionId,
            paymentReference: paymentReference,
            paymentDate: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            transactionId: mpesaTransactionId,
            paymentReference: paymentReference,
            amount: amount,
            phoneNumber: phoneNumber
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentWithMpesa };