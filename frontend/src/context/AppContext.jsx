import { createContext } from "react";
//import { assets, doctors } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios'



export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem('usertoken') ? localStorage.getItem('usertoken') : false)

    const [userData, setUserData] = useState(false)


    const getDoctorList = async () => {

        try {

            const {data} = await axios.get(backend_url + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loadProfile = async () => {
        try {

            const {data} = await axios.get(backend_url + '/api/user/get-profile', {headers: {'usertoken': token}})

            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

     const value = {
        doctors,getDoctorList,
        token, setToken,
        backend_url,
        userData, setUserData,
        loadProfile
    }

    useEffect(() => {
        getDoctorList()

    }, [])

    useEffect(() => {
        if (token) {
            loadProfile()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider