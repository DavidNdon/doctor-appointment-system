import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const navigete = useNavigate();

  return (
    <div className='flex justify-between items-center px-20 py-10 bg-primary rounded-lg m-auto h-screen '>
        {/* ----left side---- */}
        <div className='flex flex-wrap items-center w-[90vh] m-auto md:block'>
            <h1 className='text-white text-3xl font-black pb-2'>Transforming Healthcare Delivery at Mama Lucy Kibaki Hospital. <br /> A Complete Online Appointment Booking and Patient Management Solution</h1>
            <p className='text-white text-lg font-medium p-2'>Empowering Patients to Book Appointments Online, Enabling Doctors to Manage Their Schedules Efficiently, and Providing Administrators with Comprehensive System Oversight</p>
            <p className='text-white text-lg font-medium p-2'>We have the best of the best doctors that we believe will help to check on your health.</p>
            <img className='w-20 m-2' src={assets.group_profiles} alt="" srcset="" />
            <button onClick={() => navigete('/doctors') } className='flex gap-2 px-4 py-2 cursor-pointer hover:scale-x-[1.1] transition-all duration-500 hover:bg-gray-100 bg-gray-200 text-black font-light rounded-full mt-4'>Book Appointment <img src={assets.arrow_icon} alt="" srcset="" /></button>
        </div>
        {/* ----right side---- */}
        <div className='md:w-1/2 relative'>
            <img className='bottom-0 h-auto w-full '  src={assets.header_img} alt="" srcset="" />
        </div>
    </div>
  )
}

export default Hero