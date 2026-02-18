import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Banner = () => {

    const navigate = useNavigate();
    const { token } = useContext(AppContext);
   
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:12 my-20 md:mx-10'>
        {/* ----------- left side ------------ */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <h1 >Book an appointment <br /> <span className='mt-4'>with 100+ Trusted Doctors</span> </h1>
            </div>
            { !token && <button onClick={() => navigate('/login')} className='bg-white text-sm hover:scale-x-[1.1] text-gray-700 p-3 mt-3 rounded-full transition-all duration-500'>Create Account</button> }
        </div>

        {/* -----------right side --------------- */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" srcset="" />
        </div>
        
        
    </div>
  )
}

export default Banner