import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import assets from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {adminToken} = useContext(AdminContext)
    const {docToken} = useContext(DoctorContext)

  return (
    <div className='bg-primary/10 min-h-screen border-r'>
      {adminToken && (
        <ul className='mt-5'>
          <NavLink to={'/admin-dashboard'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.home_icon} alt="" srcset="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to={'/all-appointments'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.appointment_icon} alt="" srcset="" />
            <p>Appointment</p>
          </NavLink>

          <NavLink to={'/add-doctor'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.add_icon} alt="" srcset="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink to={'/doctor-list'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.people_icon} alt="" srcset="" />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {docToken && (
        <ul className='mt-5'>
          <NavLink to={'/doctor-dashboard'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.home_icon} alt="" srcset="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to={'/doctor-appointments'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.appointment_icon} alt="" srcset="" />
            <p>Appointment</p>
          </NavLink>

          

          <NavLink to={'/doctor-profile'} className={({isActive}) => `flex gap-3 items-center py-3 px-3.5 md:min-w-72 md:px-9  ${isActive ? 'border-r-4 border-primary bg-gray-100' : ''}`}>
            <img src={assets.people_icon} alt="" srcset="" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Sidebar