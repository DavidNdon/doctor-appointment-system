import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {

  const  {doctors, adminToken, allDoctors, changeAvailability} = useContext(AdminContext);

  useEffect(() => {

    if (adminToken) {
      allDoctors()
    }

  }, [adminToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-semibold'>All Doctors</h1>
      <div className=' w-full flex flex-wrap gap-4 pt-5 gap-y-4'>
        {
          doctors.map((item, index) => (
            <div className='group border border-gray-300 rounded-xl max-w-58 cursor-pointer overflow-hidden' key={index}>
              <img className='bg-indigo-50 transition-all duration-500 group-hover:bg-primary' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-bold'>{item.name}</p>
                <p className='text-zinc-600 text-sm font-semibold'>{item.speciality}</p>
                <div className='mt-5 flex items-center gap-2 text-sm'>
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList