import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { specialityData } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Speciality = () => {

    const { doctors,getDoctorList} = useContext(AppContext)
    const specialties = [...new Set(doctors.map((doc) => doc.speciality))]
    

  const navigate = useNavigate();

  return (
    <div className='mt-6 flex flex-col items-center gap-4 py-16'>
        <h1 className='text-3xl font-black'>Our <span className='text-blue-600'>Speciality.</span></h1>
        <p className='sm:w-1/2 text-lg font-medium px-4'>We have doctors whom are specialized in different areas, browse through and get an appointment with the one you want.</p>
        <div className='flex items-center gap-4 w-full sm:justify-center mt-4 mb-4 '>
            {specialityData.map((item, index) => (
                <Link className='flex flex-col items-center flex-shrink-0 text-xs cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' key={index} to={`/doctors/${specialties.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" srcset="" />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Speciality