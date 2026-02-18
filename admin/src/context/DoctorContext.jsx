import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

   const backendUrl = 'https://doctor-appointment-system-backend-br9i.onrender.com';

   const [docToken, setDocToken] = useState(localStorage.getItem('docToken')?localStorage.getItem('docToken'):'');
   const [dashboardData, setDashboardData] = useState(false);
   const [profileData, setProfileData] = useState(false);

   const [appointments, setAppointments] = useState([]);
   const getAppointments = async () => {
        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: {
                    'doctor-token': docToken
                }
            });
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
   }

   const completeAppointment = async (appointmentId) => {
    try {
        
        const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {
            headers: {
                'doctor-token': docToken}
        });
        if (data.success) {
            toast.success(data.message);
            getAppointments();
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(error.message);
    }
   }

   // cancel appointment by doctor
   const cancelAppointment = async (appointmentId) => {
    try {

        const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {
            headers: {
                'doctor-token': docToken}
        });
        if (data.success) {
            toast.success(data.message);
            getAppointments();
        } else {
            console.error(data.error)
            toast.error(data.message);
        }

    } catch (error) {
        console.error(data.error)
        toast.error(error.message);
    }
    }
   
    const getDashboardData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {
                headers: {
                    'doctor-token': docToken
                }
            });
            if (data.success && data.dashboardData) {
                setDashboardData(data.dashboardData);
                console.log('dashboardData:', data.dashboardData);
            } else if (data.success) {
                setDashboardData(data);
                console.log('dashboardData:', data);
            } else {
                console.error(data.error);
                toast.error(data.message);
            }
            
        } catch (error) {
            console.error(data.error)
        toast.error(error.message);
        }
    }

const getProfileData = async () => {
    try {
        
        const {data} = await axios.get(backendUrl + '/api/doctor/profile', {
            headers: {
                'doctor-token': docToken
            }
        });
        if (data.success) {
            setProfileData(data.profileData);
            console.log(data.profileData)
        }

    } catch (error) {
         console.error(data.error)
        toast.error(error.message);
    }
}

    const value = {

        backendUrl,
        docToken,setDocToken,
        appointments, setAppointments, 
        getAppointments,
        completeAppointment, cancelAppointment,
        dashboardData, setDashboardData, getDashboardData,
        profileData, setProfileData, getProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
