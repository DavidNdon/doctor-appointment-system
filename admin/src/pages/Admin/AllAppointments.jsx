import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {

    const { adminToken, appointments, getAllAppointments } = useContext(AdminContext);

    useEffect(() => {
        if (adminToken) {
            getAllAppointments();
        }
    }, [adminToken])

  return (
    <div className=" w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-bold">All Appointment made</p>
      <div className=" gap-4 max-h-[80vh] min-h-[60vh] bg-gray-200 p-2 rounded-md text-sm font-black overflow-y-scroll">
        <div className='hidden sm:grid grid-cols-[0.5fr_1.5fr_1fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          {/* <p>Age</p> */}
          <p className='border-x px-2 mr-1'>Date and Time</p>
          <p>Doctor's Name</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.length > 0 ? appointments.map((appointment, index) => (
          <div key={index} className='grid grid-cols-[0.5fr_1.5fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 grid-flow-col border-b items-center'>
            <p>{index + 1}</p>
            <div className='flex flex-col items-center gap-2'>
                <img src={appointment.userData.image} alt="" className='w-8 h-8 rounded-full object-cover' />
                <p>{appointment.userData.name}</p>
            </div>
            {/* <p>{appointment.userData.age || null}</p> */}
            <p className='border-x px-2'>{appointment.slotDate} at {appointment.slotTime}</p>
           <div className='flex items-center gap-2'>
            <img className='w-8 rounded-full' src={appointment.docData.image} alt="" srcset="" />
             <p>{appointment.docData.name}</p>
           </div>
            <p>Ksh {appointment.amount}</p>
            <div className='flex items-center gap-2'>
                {appointment.cancel ? (
                    <p className='text-red-500'>Cancelled</p>
                ) : appointment.isCompleted ? (
                    <p className='text-green-500'>Completed</p>
                ) : (
                    <p className='text-blue-500'>Upcoming</p>
                )}
            </div>
            </div>
        )) : (
            <p className='text-center text-gray-500 py-10'>No appointments made yet</p>
        )}


      </div>
    </div>
  );
}

export default AllAppointments