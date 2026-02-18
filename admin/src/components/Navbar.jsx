import React, { useContext } from 'react'
import assets from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = () => {

    const {adminToken, setAdminToken} = useContext(AdminContext);
    const {docToken, setDocToken} = useContext(DoctorContext);

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        adminToken && setAdminToken('')
        adminToken && localStorage.removeItem('adminToken')
        docToken && setDocToken('')
        docToken && localStorage.removeItem('docToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-lg'>
        <div className='flex gap-3 items-center'>
            <img className='w-16' src={assets.admin_logo} alt="" srcset="" />
            <p className='py-2 px-4 text-sm rounded-full border text-gray-900 bg-primary/10 '>{adminToken ? 'Admin': 'Doctor'}</p>
        </div>

        <button onClick={logout} className='py-2 px-10 bg-primary text-white border-0 rounded-full cursor-pointer font-semibold transition-all duration-500 hover:scale-105'>Logout</button>
    </div>
  )
}

export default Navbar