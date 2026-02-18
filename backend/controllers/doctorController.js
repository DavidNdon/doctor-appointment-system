import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorsModel.js";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {

   try {

     const {docId} = req.body;

     const docData = await doctorModel.findById(docId);
     await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});
     res.status(200).send({success: true, message: "Availability status changed successfully"})

   } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Error in changing availability status", error})
   }

};

const doctorList = async (req, res) => {
  try {

    const doctors = await doctorModel.find({}).select(["-password", '-email']);
    res.status(200).send({success: true, message: "Doctor list fetched successfully", doctors})
    
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: "Error in changing availability status", error})
  }
}

const docLogin = async (req, res) => {

  try {
    
    const {email, password} = req.body;
    const doctor = await doctorModel.findOne({email});
    if(!doctor) {
      return res.status(200).send({success: false, message: "Doctor not found"});
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
      res.status(200).send({success: true, message: "Doctor logged in successfully", token, doctor: {...doctor._doc, password: ""}});
    } else {
      res.status(200).send({success: false, message: "Incorrect password"});
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: "Error in changing availability status", error})
  }
}

//get doctor appointments

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    if (!doctorId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const appointments = await appointmentModel.find({ docId: doctorId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error fetching appointments', error });
  }
};


// mark appointment as completed
const markAppointmentCompleted = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      res.status(200).json({ success: true, message: "Appointment marked as completed successfully" });
    } else {
      res.status(403).json({ success: false, message: "Unauthorized: Invalid doctor or appointment ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error marking appointment as completed', error });
  }
};

// cancel appointment by doctor
const cancelAppointment = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    if (appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancel: true });
      res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    } else {
      res.status(403).json({ success: false, message: "Unauthorized: Invalid doctor or appointment ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error cancelling appointment', error });
  }
};

//doctor's dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.doctor?.id;
    let earnings = 0;
    const appointments = await appointmentModel.find({ docId: doctorId });
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount || 0;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });
    const dashboardData = {
      earnings,
      totalAppointments: appointments.length,
      totalPatients: patients.length,
      latestappointments: appointments.reverse().slice(-5),
    };
    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error getting doctor dashboard', error });
  }
}

// get doctor profile data
const doctorProfile = async (req, res) => {
  try {
    
    const doctorId = req.doctor?.id;
    const profileData = await doctorModel.findById(doctorId).select("-password");
    if (profileData) {
      res.status(200).json({ success: true, profileData });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error getting doctor profile', error });
  }
}

// update doctor profile data
const updateDoctorProfile = async (req, res) => {
  try {
    
    const doctorId = req.doctor?.id;
    const { name, available, address, experience, fees} = req.body;
    await doctorModel.findByIdAndUpdate(doctorId, {name, available, address, experience, fees});
    res.status(200).json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error updating doctor profile', error });
  }
}

export { changeAvailability, doctorList, docLogin, getDoctorAppointments, markAppointmentCompleted, cancelAppointment, doctorDashboard, doctorProfile, updateDoctorProfile };