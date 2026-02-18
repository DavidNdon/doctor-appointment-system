import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import MpesaPayment from './MpesaPayment';

const MyAppointment = () => {

  const {backend_url,token,userData} = useContext(AppContext);
  //const [erase,setErace] = useState([]);
  const [appointments,setAppointments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getAppointments = async () => {
    try {
      const {data} = await axios.get(backend_url + '/api/user/appointments', {headers: {'usertoken': token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

      console.log(appointmentId)

      console.log(appointmentId)
      const {data} = await axios.post(backend_url + '/api/user/cancel-appointment', {appointmentId, userId: userData?._id}, {headers: {'usertoken': token}})

      if (data.success) {
        toast.success(data.message)
        getAppointments()
      }else {
        console.log(data.message)
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const mpesaPayment = async (appointmentId) => {
    // Get the appointment to display in the modal
    const appointment = appointments.find(app => app._id === appointmentId);
    if (!appointment) {
      toast.error('Appointment not found');
      return;
    }

    // Set the selected appointment and show the modal
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedAppointment(null);
    getAppointments();
  };

  useEffect(() => {
    if (token) {
      getAppointments()
    }
  }, [token])

  return (
    <div className='overflow-y-scroll'>
      <h1 className='text-2xl  font-black text-center m-5'>My Appointments</h1>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className="flex justify-between items-center border rounded p-2 gap-3 mx-4 my-2">
            
            <div className="flex justify-between items-center">
              <img
              src={item.docData.image}
              className="size-46 p-3 bg-indigo-500 rounded m-3"
              alt=""
              srcset=""
            />
              <div>
                <h1 className='font-bold text-lg'>{item.docData.name}</h1>
                <p className='text-lg font-mono mb-3'> {item.docData.speciality} </p>

                <h1 className='font-bold text-lg italic'>Address:</h1>
                <p className='text-sm font-mono'>{item.docData.address.line1}</p>
                <p className='text-sm font-mono'>{item.docData.address.line2}</p>
                <p className='text-lg mt-1 italic text-green-500'><span className='text-sm text-neutral-700 font-medium'>Date: </span>{item.slotDate} <span className='text-sm text-neutral-700 font-medium'>Time:</span> {item.slotTime} </p>
              </div>

              <div className='flex flex-col justify-between items-center ml-[600px] gap-4'>
                {!item.cancel ? (
                  <div className='flex flex-col justify-between items-center gap-4'>
                    {item.isCompleted && item.payment ? (
                      <>
                        <button disabled className='p-2 border-0 rounded bg-green-700 text-white text-sm font-semibold cursor-not-allowed'>Completed</button>
                        <button disabled className='p-2 border-0 rounded bg-green-500 text-white text-sm font-semibold cursor-not-allowed'>Paid</button>
                      </>
                    ) : item.isCompleted ? (
                      <button disabled className='p-2 border-0 rounded bg-green-700 text-white text-sm font-semibold cursor-not-allowed'>Completed</button>
                    ) : item.payment ? (
                      <button disabled className='p-2 border-0 rounded bg-green-500 text-white text-sm font-semibold cursor-not-allowed'>Paid</button>
                    ) : (
                      <div>
                        <button onClick={() => mpesaPayment(item._id)} className='p-2 border-0 rounded bg-primary/90 text-white text-sm font-semibold cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-primary/100'>Pay Online</button>
                      </div>
                    )}
                    <button onClick={() => cancelAppointment(item._id)} disabled={item.payment || item.isCompleted} className='p-2 border-0 bg-red-500 text-white rounded text-sm font-semibold cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'>Cancel Appoinment</button>
                  </div>
                ) : (
                  <p disabled className='p-2 border-0 bg-neutral-400 text-red-700 rounded text-sm italic font-semibold cursor-not-allowed'>Appointment Cancelled</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPaymentModal && selectedAppointment && (
        <MpesaPayment
          appointment={selectedAppointment}
          backend_url={backend_url}
          token={token}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}

export default MyAppointment