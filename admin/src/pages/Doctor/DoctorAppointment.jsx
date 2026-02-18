import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import assets from '../../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';

const DoctorAppointment = () => {
  const { backendUrl, docToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    if (docToken) getAppointments();
  }, [docToken]);


  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="text-xl text-center font-bold text-indigo-600 mb-4">
        My Appointments
      </h1>
      <div className="bg-neutral-200 border rounded-sm text-sm min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_1.5fr_1fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {appointments.reverse().map((appointment, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_1.5fr_1fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b items-center"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={appointment.userData?.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{appointment.userData?.name}</p>
            </div>
            <p className={appointment.payment ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
              {appointment.payment ? "Paid" : "Pending"}
            </p>
            <p>
              {appointment.slotDate} at {appointment.slotTime}
            </p>
            <p>Ksh {appointment.amount}</p>
            <div className="flex items-center gap-2">
              {appointment.cancel ? (
                <p className="text-red-500">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500">Completed</p>
              ) : (
                <p className="text-blue-500">Upcoming</p>
              )}

              {!appointment.isCompleted && ! appointment.cancel && <div className='flex gap-2 items-end justify-start'>
                <img onClick={() => cancelAppointment(appointment._id)} className='w-10 cursor-pointer p-0.5 rounded-sm items-center hover:bg-primary/10 hover:scale-105 transition-all duration-300' src={assets.cancel_icon} alt="" />
                <img onClick={() => completeAppointment(appointment._id)} className='w-10 cursor-pointer p-0.5 rounded-sm items-center hover:bg-primary/10 hover:scale-105 transition-all duration-300' src={assets.tick_icon} alt="" />
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;


{/* <div className="w-full max-w-6xl m-5">
      <h1 className="mb-3 text-lg font-bold">My Appointments</h1>
      <div className="gap-4 max-h-[80vh] min-h-[60vh] bg-gray-200 p-2 rounded-md text-sm font-black overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.3fr_1.5fr_2fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p className="px-2">Date and Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div key={index} className="grid grid-cols-[0.3fr_1.5fr_2fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b items-center">
              <p>{index + 1}</p>
              <div className="flex items-start gap-2">
                <img src={appointment.userData?.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p>{appointment.userData?.name}</p>
              </div>
              <p className="px-2">{appointment.slotDate} at {appointment.slotTime}</p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full" src={appointment.docData?.image} alt="" />
                <p>{appointment.docData?.name}</p>
              </div>
              <p>Ksh {appointment.amount}</p>
              <div className="flex items-center gap-2">
                {appointment.cancel ? (
                  <p className="text-red-500">Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <p className="text-blue-500">Upcoming</p>
                )}
              </div>
              <div className="flex gap-2">
                {!appointment.cancel && !appointment.isCompleted && (
                  <>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-700"
                      onClick={() => cancelAppointment(appointment._id)}
                    >Cancel</button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700"
                      onClick={() => markCompleted(appointment._id)}
                    >Mark Completed</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No appointments found</p>
        )}
      </div>
    </div>  */}