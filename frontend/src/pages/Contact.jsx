import React from 'react'
import contact from '../assets/contact_image.png'
import { useNavigate } from 'react-router-dom'

const Contact = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
    <p>CONTACT <span className='text-primary font-semibold'>US</span></p>
  </div>

  <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

    <img className='w-full md:max-w-[360px]' src={contact} alt="" />

    <div className='flex flex-col justify-center items-start gap-6'>
      <p className='font-semibold text-lg text-gray-600'>Our LOCATION</p>
      <p className='text-gray-500'>Umoja II, off Kangundo Road <br /> Embakasi West, Nairobi, Kenya</p>
      <p className='text-gray-500'>Tel: +254 756454645 <br /> Email: mamalucykibakihospital@gmail.com</p>
      <p className='font-semibold text-lg text-gray-600'>Careers at Mama Lucy Kibaki Hospital</p>
      <p className='text-gray-500'>Learn more about our teams and job openings.</p>
      <button onClick={() => navigate('/doctors')} className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Doctors</button>
    </div>
    </div>
    </div>
  )
}

export default Contact