import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):'')

    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashboardData, setDashboardData] = useState(false);
    
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const allDoctors = async () => {

        try {

            const { data } = await axios.post(
              backend_url + "/api/admin/all-doctors", {}, {
                headers: {
                  "admin-token": adminToken,
                },
              },
            );
            if (data.success) {
              setDoctors(data.doctors);
              console.log(data.doctors);
            } else {
              toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }

    }

    const changeAvailability =  async (docId) =>{

      try {

        const {data} = await axios.post(backend_url + '/api/admin/change-availability', {docId}, {
          headers: {
            'admin-token': adminToken
          }
        });

        if (data.success) {
          toast.success(data.message);
          allDoctors()
        }else{
          toast.error(data.message);
        }
        
      } catch (error) {
        toast.error(data.message);
      }

    } 

    const getAllAppointments = async () => {

      try {
        
        const {data} = await axios.get(backend_url + '/api/admin/admin-appointments', {
          headers: {
            'admin-token': adminToken
          }
        });

        if (data.success) {
          setAppointments(data.appointments);
          console.log(data.appointments)
        }else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(data.message);
      }


    }

    const getDashboardData = async () => {

      try {
        
        const {data} = await axios.get(backend_url + '/api/admin/admin-dashboard', {
          headers: {
            'admin-token': adminToken
          }
        });

        if (data.success) {
          setDashboardData(data.dashboardData);
          console.log(data.dashboardData)
        }else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(data.message);
      }


    }

    const value = {
        adminToken, setAdminToken,
        backend_url, doctors,
        allDoctors, changeAvailability,
        appointments, setAppointments, 
        getAllAppointments, dashboardData, getDashboardData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider